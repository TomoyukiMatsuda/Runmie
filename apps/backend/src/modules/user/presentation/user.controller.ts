import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../usecase/create-user.usecase';
import { CreateUserDto, UpdateUserDto } from './user-dto';
import { UpdateUserUseCase } from '../usecase/update-user.usecase';
import { GetUserUseCase } from '../usecase/get-user.usecase';

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: CreateUserDto,
  ): Promise<{ id: string; name: string }> {
    return await this.createUserUseCase.execute(body.name);
  }

  @Post('sign_in')
  async signIn(): Promise<{ id: string; name: string }> {
    // todo: 認証処理
    return await this.getUserUseCase.execute('id');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<{
    success: boolean;
  }> {
    await this.updateUserUseCase.execute(id, dto.name);
    return { success: true };
  }
}
