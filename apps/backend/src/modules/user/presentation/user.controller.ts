import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../usecase/create-user.usecase';
import { UpdateUserDto } from './user-dto';
import { UpdateUserUseCase } from '../usecase/update-user.usecase';
import { GetUserUseCase } from '../usecase/get-user.usecase';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
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
    const [type, authToken] = authorization.split(' ');

    if (type !== 'Bearer' || !authToken) {
      throw new UnauthorizedException();
    }

    return await this.createUserUseCase.execute(authToken);
  }

  @UseGuards(AuthUserGuard)
  @Get('me')
  async get(
    @AuthUser() user: AuthUserType,
  ): Promise<{ id: string; name: string }> {
    return await this.getUserUseCase.execute(user.id);
  }

  @UseGuards(AuthUserGuard)
  @Patch('me')
  async update(
    @AuthUser() user: AuthUserType,
    @Body() dto: UpdateUserDto,
  ): Promise<{
    success: boolean;
  }> {
    await this.updateUserUseCase.execute(user.id, dto.name);
    return { success: true };
  }
}
