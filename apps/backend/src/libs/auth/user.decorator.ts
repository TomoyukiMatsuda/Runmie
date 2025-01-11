import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthUserType = {
  id: string;
  name: string;
};

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserType => {
    // HTTPコンテキストからリクエストオブジェクトを取得
    const request = ctx.switchToHttp().getRequest();
    // AuthGuardで添付したユーザー情報を返す
    return request.user;
  },
);
