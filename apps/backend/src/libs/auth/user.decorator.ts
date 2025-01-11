import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // HTTPコンテキストからリクエストオブジェクトを取得
    const request = ctx.switchToHttp().getRequest();
    // AuthGuardで添付したユーザー情報を返す
    return request.user;
  },
);

