import useSWRMutation from 'swr/mutation';
import {
  ApiParams,
  ApiPath,
  ApiResponse,
  HttpMethod,
} from '../../../../shared/types/apiConst';
import { useCustomFetch } from '@/utils/customFetch';

export const useCustomSWRMutation = <
  Path extends ApiPath,
  Method extends HttpMethod = 'GET',
>(
  path: Path,
  params: ApiParams<Path, Lowercase<Method>>,
  option?: {
    method?: Method;
  },
) => {
  const customFetch = useCustomFetch();
  return useSWRMutation<
    ApiResponse<Path, Lowercase<Method>>,
    Error,
    [Path, ApiParams<Path, Lowercase<Method>>, Method],
    Partial<ApiParams<Path, Lowercase<Method>>> | undefined
  >(
    [path, params, option?.method || ('GET' as Method)],
    async ([keyPath, keyParams, keyMethod], { arg }) => {
      const result = await customFetch(keyMethod, keyPath, {
        ...keyParams,
        ...arg,
      });
      if (result.success) {
        return result.response;
      }

      throw new Error('SWR Error status code: ' + result.status);
    },
  );
};
