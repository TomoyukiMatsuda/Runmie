import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

// こっちだと認証がうまくいった？こちらを利用する方が良い？
export const supabaseBrowserClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      flowType: 'pkce',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true, // URLからセッション情報を検出
    },
  },
);
