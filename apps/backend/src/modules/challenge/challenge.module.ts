import { Module } from '@nestjs/common';
import { ChallengeController } from '@/modules/challenge/presentation/challenge.controller';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import { AuthModule } from '@/libs/auth/auth.module';
import { AddChallengeMemberUsecase } from '@/modules/challenge/usecase/join-challenge.usecase';
import { ChallengeMemberController } from '@/modules/challenge/presentation/challenge-member.controller';

@Module({
  imports: [AuthModule],
  controllers: [ChallengeController, ChallengeMemberController],
  providers: [
    CreateChallengeUseCase,
    AddChallengeMemberUsecase,
    ChallengeRepository,
  ],
})
export class ChallengeModule {}
