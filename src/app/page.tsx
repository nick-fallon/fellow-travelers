'use client'

import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

const supabase = createClient();

const getProfiles = async () => {
  const { data, error } = await supabase.from('profiles').select();
  return data;
}

export default function Home() {
    const [profiles, setProfiles] = useState<null | any[]>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProfiles();
                setProfiles(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        })()
    }, [])

    if (loading) {
        return (
            <pre>
                Loading...
            </pre>
        )
    }

    if (error) {
        return (
            <pre>Error</pre>
        )
    }
  return (
      <main>
          {profiles && profiles?.map((profile) => (
              <div key={profile.id}>
                  {profile.full_name}
              </div>
          ))}
      </main>
  );
}
