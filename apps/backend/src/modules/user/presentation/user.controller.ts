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
import { ApiResponse } from '../../../../../../shared/types/apiConst';

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
  ): Promise<ApiResponse<'/signup', 'post'>> {
    const [type, authToken] = authorization.split(' ');

    if (type !== 'Bearer' || !authToken) {
      throw new UnauthorizedException();
    }

    await this.createUserUseCase.execute(authToken);
    return { success: true };
  }

  @UseGuards(AuthUserGuard)
  @Get('me')
  async get(
    @AuthUser() user: AuthUserType,
  ): Promise<ApiResponse<'/me', 'get'>> {
    return await this.getUserUseCase.execute(user.id);
  }

  @UseGuards(AuthUserGuard)
  @Patch('me')
  async update(
    @AuthUser() user: AuthUserType,
    @Body() dto: UpdateUserDto,
  ): Promise<ApiResponse<'/me', 'patch'>> {
    await this.updateUserUseCase.execute(user.id, dto.name);
    return { success: true };
  }
}
