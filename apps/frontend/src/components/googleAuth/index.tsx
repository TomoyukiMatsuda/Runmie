'use client';

import { supabaseBrowserClient } from '@/utils/supabase/client';
import { useCallback } from 'react';

export function GoogleAuth() {
  const handleGoogleLogin = useCallback(async () => {
    try {
      // Googleログインを実行
      const { error } = await supabaseBrowserClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: false,
          // デバッグ用にエラーを詳細に表示
          queryParams: {
            next: '/profile',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      alert('ログインに失敗しました');
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="rounded bg-white px-4 py-2 text-gray-800 shadow-md hover:bg-gray-100"
      >
        Google でログイン
      </button>
    </div>
  );
}
