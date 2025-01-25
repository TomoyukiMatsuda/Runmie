import { paths } from './apiSchema';

export type ApiPath = keyof paths;
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type ExtractQuery<Operation> = Operation extends {
  parameters: {
    query: infer Query;
  };
}
  ? Query
  : never;
type ExtractBody<Operation> = Operation extends {
  requestBody: {
    content: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'application/json': infer RequestBody;
    };
  };
}
  ? RequestBody
  : never;
export type ApiParams<
  Path extends ApiPath,
  Method extends Lowercase<HttpMethod> = Lowercase<HttpMethod>,
> = Path extends keyof paths
  ? Method extends keyof paths[Path]
    ? Method extends 'get' | 'delete'
      ? ExtractQuery<paths[Path][Method]> extends never
        ? {}
        : ExtractQuery<paths[Path][Method]>
      : Method extends 'post' | 'patch'
        ? ExtractBody<paths[Path][Method]> extends never
          ? {}
          : ExtractBody<paths[Path][Method]>
        : never
    : never
  : never;

type ExtractResponse<Operation> = Operation extends {
  responses: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    200?: {
      content: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'application/json': infer Res;
      };
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    201?: {
      content: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'application/json': infer Res;
      };
    };
  };
}
  ? Res
  : never;
export type ApiResponse<
  Path extends ApiPath,
  Method extends Lowercase<HttpMethod> = Lowercase<HttpMethod>,
> = Path extends keyof paths
  ? Method extends keyof paths[Path]
    ? ExtractResponse<paths[Path][Method]>
    : never
  : never;

// export type ErrorResponse =
//   components['responses']['ErrorResponse']['content']['application/json'];
