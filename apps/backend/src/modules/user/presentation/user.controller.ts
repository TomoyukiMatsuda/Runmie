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
import { CreateUserDto, UpdateUserDto } from './user-dto';
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
    @Body() body: CreateUserDto,
  ): Promise<{ id: string; name: string }> {
    const [type, authToken] = authorization.split('');
    if (type !== 'Bearer' || !authToken) {
      throw new UnauthorizedException();
    }

    return await this.createUserUseCase.execute(authToken, body.name);
  }

  @UseGuards(AuthGuard)
  @Get()
  async get(
    @AuthUser() user: AuthUserType,
  ): Promise<{ id: string; name: string }> {
    return await this.getUserUseCase.execute(user.id);
  }

  // todo supabase に任せればいらないかも
  @Post('sign_in')
  async signIn(): Promise<{ id: string; name: string }> {
    // todo: 認証処理
    return await this.getUserUseCase.execute('1234567890123456789012345');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, // todo: ログインユーザーのIDを取得
    @Body() dto: UpdateUserDto,
  ): Promise<{
    success: boolean;
  }> {
    await this.updateUserUseCase.execute(id, dto.name);
    return { success: true };
  }
}
