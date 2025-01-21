import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '@/libs/supabase/supabase.service';
import * as console from 'node:console';
import { PrismaService } from '@/libs/prisma/prisma.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const {
        data: { user: supabaseUser },
        error,
      } = await this.supabase.supabaseClient.auth.getUser(token);

      if (error || !supabaseUser) {
        throw new UnauthorizedException();
      }
      const user = await this.prisma.user.findUnique({
        where: {
          supabaseId: supabaseUser.id,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }
      console.log('auth user', user);

      // リクエストにユーザー情報を添付
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
