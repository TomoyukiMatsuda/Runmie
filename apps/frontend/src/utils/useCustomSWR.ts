import useSWR, { SWRConfiguration } from 'swr';
import {
  ApiParams,
  ApiPath,
  ApiResponse,
  HttpMethod,
} from '../../../../shared/types/apiConst';
import { useCustomFetch } from '@/utils/customFetch';

export type CustomSWRConfiguration = SWRConfiguration & {
  disabled?: boolean; // true で データ取得を実行しない
};
export const useCustomSWR = <
  Path extends ApiPath,
  Method extends HttpMethod = 'GET',
>(
  path: Path,
  params: ApiParams<Path, Lowercase<Method>>,
  option?: {
    method?: Method;
  } & CustomSWRConfiguration,
) => {
  const customFetch = useCustomFetch();
  return useSWR<
    ApiResponse<Path, Lowercase<Method>>,
    Error,
    [Path, ApiParams<Path, Lowercase<Method>>, Method] | null
  >(
    option?.disabled
      ? null
      : [path, params, option?.method || ('GET' as Method)],
    async ([keyPath, keyParams, keyMethod]) => {
      const result = await customFetch(keyMethod, keyPath, keyParams);
      if (result.success) {
        return result.response;
      }

      throw new Error('SWR Error status code: ' + result.status);
    },
    option,
  );
};
