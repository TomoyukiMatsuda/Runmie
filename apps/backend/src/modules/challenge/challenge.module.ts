import { Module } from '@nestjs/common';
import { PrismaModule } from '@/libs/prisma/prisma.module';
import { ChallengeController } from '@/modules/challenge/presentation/challenge.controller';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeRepository } from '@/modules/challenge/domain/repository/challenge.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ChallengeController],
  providers: [CreateChallengeUseCase, ChallengeRepository],
})
export class ChallengeModule {}
