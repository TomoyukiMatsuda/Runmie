import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../usecase/create-user.usecase';
import { UpdateUserDto } from './user-dto';
import { UpdateUserUseCase } from '../usecase/update-user.usecase';
import { GetUserUseCase } from '../usecase/get-user.usecase';
import { AuthGuard } from '@/libs/auth/auth.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post('signup')
  async signup(
    @Headers('Authorization') authorization: string,
  ): Promise<{ id: string; name: string }> {
    console.log('auth', authorization);
    const [type, authToken] = authorization.split(' ');
    console.log('authToken1', authToken);

    if (type !== 'Bearer' || !authToken) {
      throw new UnauthorizedException();
    }

    console.log('authToken2', authToken);
    return await this.createUserUseCase.execute(authToken);
  }

  // todo supabase に任せればいらないかも
  @Post('sign_in')
  async signIn(): Promise<{ id: string; name: string }> {
    // todo: 認証処理
    return await this.getUserUseCase.execute('1234567890123456789012345');
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async get(
    @AuthUser() user: AuthUserType,
  ): Promise<{ id: string; name: string }> {
    return await this.getUserUseCase.execute(user.id);
  }

  @Patch('me')
  async update(
    @Param('id') id: string, // todo: ログインユーザーのIDを session から取得する
    @Body() dto: UpdateUserDto,
  ): Promise<{
    success: boolean;
  }> {
    await this.updateUserUseCase.execute(id, dto.name);
    return { success: true };
  }
}
