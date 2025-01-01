import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { CreateUserUseCase } from '@/modules/user/usecase/create-user.usecase';
import { UpdateUserUseCase } from '@/modules/user/usecase/update-user.usecase';
import { GetUserUseCase } from '@/modules/user/usecase/get-user.usecase';
import { UserRepository } from '@/modules/user/domain/user.repository';
import { PrismaModule } from '@/libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
    UserRepository,
  ],
})
export class UserModule {}
