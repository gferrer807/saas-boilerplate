import '../styles/globals.css'
import { useEffect, useState } from 'react';
import React from 'react';
import 'styles/main.css';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <div>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
            <Component {...pageProps} />
        </MyUserContextProvider>
      </SessionContextProvider>
    </div>
  );
}
