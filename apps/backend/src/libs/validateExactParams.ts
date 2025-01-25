/**
 * 不要なパラメータを含まないようにする
 * Dto class に implements して利用する
 */
export type ValidateExactProps<Dto, Params> = {
  [P in keyof Dto]: P extends keyof Params ? Params[P] : never;
} & Params;
