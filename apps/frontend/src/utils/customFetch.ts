import {
  ApiParams,
  ApiPath,
  ApiResponse,
  HttpMethod,
} from '../../../../shared/types/apiConst';
import queryString from 'query-string';
import { supabaseBrowserClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

type SuccessResult<Res> = {
  success: true;
  response: Res;
};
type ErrorResult = {
  success: false;
  status: number;
};

/**
 * client-side で利用する fetch 関数
 */
export function useCustomFetch() {
  const pathname = usePathname();
  return useCallback(
    <Path extends ApiPath, Method extends HttpMethod>(
      method: Method,
      path: Path,
      params: ApiParams<Path, Lowercase<Method>>,
    ): Promise<
      SuccessResult<ApiResponse<Path, Lowercase<Method>>> | ErrorResult
    > => customFetch(method, path, params, pathname),
    [pathname],
  );
}

export async function customFetch<
  Path extends ApiPath,
  Method extends HttpMethod,
>(
  method: Method,
  path: Path,
  params: ApiParams<Path, Lowercase<Method>>,
  refererPathname?: string,
): Promise<SuccessResult<ApiResponse<Path, Lowercase<Method>>> | ErrorResult> {
  const session = await supabaseBrowserClient.auth.getSession();
  const token = session?.data.session?.access_token;
  return fetch(getRequestUrl(method, path, params), {
    body: queryRequest(method) ? undefined : JSON.stringify(params),
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'Referer-pathname': refererPathname ?? '',
    },
    method,
  }).then(async (res) => {
    if (res.ok) {
      const parsedRes = (await res.json()) as ApiResponse<
        Path,
        Lowercase<Method>
      >;
      return {
        success: true,
        response: parsedRes,
      };
    }

    return {
      success: false,
      status: res.status,
    };
  });
}

const queryRequest = (method: HttpMethod) => {
  return method === 'GET' || method === 'DELETE';
};

function getRequestUrl<Path extends ApiPath, Method extends HttpMethod>(
  method: HttpMethod,
  path: Path,
  params: ApiParams<Path, Lowercase<Method>>,
) {
  const url = `${process.env.NEXT_PUBLIC_RUNMIE_API_URL}${path}`;
  if (queryRequest(method)) {
    const query = queryString.stringify(params, { arrayFormat: 'bracket' });
    return query === '' ? url : `${url}?${query}`;
  }
  return url;
}
