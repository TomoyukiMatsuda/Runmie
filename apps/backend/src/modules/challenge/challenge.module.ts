import { Module } from '@nestjs/common';
import { ChallengeController } from '@/modules/challenge/presentation/challenge.controller';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import { AuthModule } from '@/libs/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChallengeController],
  providers: [CreateChallengeUseCase, ChallengeRepository],
})
export class ChallengeModule {}
