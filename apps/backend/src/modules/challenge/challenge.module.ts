import { Module } from '@nestjs/common';
import { ChallengeController } from '@/modules/challenge/presentation/challenge.controller';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import { AuthModule } from '@/libs/auth/auth.module';
import { ChallengeMemberController } from '@/modules/challenge/presentation/challenge-member.controller';
import { GetChallengesByUserIdUsecase } from '@/modules/challenge/usecase/get-challenges-by-user-id.usecase';
import { AddChallengeMemberUsecase } from '@/modules/challenge/usecase/add-challenge-member.usecase';

@Module({
  imports: [AuthModule],
  controllers: [ChallengeController, ChallengeMemberController],
  providers: [
    CreateChallengeUseCase,
    AddChallengeMemberUsecase,
    GetChallengesByUserIdUsecase,
    ChallengeRepository,
  ],
})
export class ChallengeModule {}
