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
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    if (!error && token) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';

      const meResponse = await fetch('http://localhost:8000/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('me', meResponse);
      // todo status code で よくわかんないエラー or ユーザー情報が取得できなかった場合でハンドリングしたい
      if (!meResponse.ok && meResponse.status === 401) {
        console.log('新規登録する');
        // 新規登録する
        await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }

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

  // TODO: エラーハンドリング
  NextResponse.redirect('/error');
}
