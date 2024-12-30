import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { PrismaService } from '../../libs/prisma/prismaService';

@Module({
  imports: [PrismaService],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
