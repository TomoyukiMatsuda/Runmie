import { Module } from '@nestjs/common';
import { PrismaService } from './prismaService';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
