'use client';

import { supabaseClient } from '@/utils/supabase/client';
import { useCallback } from 'react';

export function GoogleAuth() {
  const handleGoogleLogin = useCallback(async () => {
    try {
      // Googleログインを実行
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
        Googleでログイン
      </button>
    </div>
  );
}
