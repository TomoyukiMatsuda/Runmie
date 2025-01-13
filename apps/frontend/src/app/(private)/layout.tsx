'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import useSWRMutation from 'swr/mutation';
import useSWR, { useSWRConfig } from 'swr';

type CurrentUserResponse = {
  id: string;
  name: string;
};
const fetcher = async (
  [method, path]: [string, string],
  {
    arg: { authToken },
  }: {
    arg: { authToken: string };
  },
) => {
  const url = 'http://localhost:80' + path;
  const result = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  return (await result.json()) as CurrentUserResponse;
};
export function useSwrCacheClear() {
  const { mutate } = useSWRConfig();
  return useCallback(() => {
    mutate(
      () => true,
      undefined, // キャッシュデータを `undefined` に更新する
      { revalidate: false },
    ).catch(() => {
      console.error('Failed to clear cache');
    });
  }, [mutate]);
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trigger: fetchCurrentUser } = useSWRMutation<
    CurrentUserResponse,
    Error,
    ['GET', string],
    { authToken: string }
  >(['GET', '/me'], fetcher);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { data: currentUser } = useSWR<
    CurrentUserResponse,
    Error,
    ['GET', string] | null
  >(authToken ? ['GET', '/me'] : null, ([method, path]) =>
    fetcher([method, path], {
      arg: { authToken: authToken ?? '' },
    }),
  );

  const clearCache = useSwrCacheClear();

  useEffect(() => {
    // 初期セッションの取得
    supabaseBrowserClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthToken(session.access_token);
        fetchCurrentUser({ authToken: session.access_token }).catch(() => {
          setAuthToken(null);
          console.error('Failed to fetch current user');
        });
      }
    });

    // セッションの変更を監視
    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange((_event, session) => {
      console.log('session', session);
      if (session) {
        setAuthToken(session.access_token);
        fetchCurrentUser({ authToken: session.access_token }).catch(() => {
          setAuthToken(null);
          console.error('Failed to fetch current user');
        });
      } else {
        setAuthToken(null);
        clearCache();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchCurrentUser, clearCache]);

  // todo ここにヘッダーとフッターを追加する
  return (
    <div className="flex h-screen">
      <p>user name: {currentUser?.name}</p>
      {children}
    </div>
  );
}
