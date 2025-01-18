import { type NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get('access_token');
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  // うまくいかん
  // https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=environment&environment=client

  console.log('============ route GET /auth/callback ==========');
  console.log('tokenHash:', tokenHash);
  console.log('code:', code);
  console.log('next:', next);

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log('error:', error);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // redirect the user to an error page with some instructions
  NextResponse.redirect('/error');
}
