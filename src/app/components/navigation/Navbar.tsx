'use client';

import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import Logo from '@/app/components/navigation/Logo';

const supabase = createClient();

async function getLoggedIn() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      const data = await getLoggedIn();
      setUser(data);
    })();
  }, [pathname]);

  return (
    <>
      <section className='w-full flex flex-row justify-between'>
        <Logo />
        <div className='flex flex-row flex-end'>
          <Link href={user ? '/account' : '/login'}>
            <p>{user ? user.email : 'Log In'}</p>
          </Link>
          {user && (
            <form action='/auth/signout' method='post'>
              <button type='submit'>Sign Out</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
