import { Module } from '@nestjs/common';
import { ChallengeController } from '@/modules/challenge/presentation/challenge.controller';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import { AuthModule } from '@/libs/auth/auth.module';
import { ChallengeMemberController } from '@/modules/challenge/presentation/challenge-member.controller';
import { GetChallengesByUserIdUsecase } from '@/modules/challenge/usecase/get-challenges-by-user-id.usecase';
import { AddChallengeMemberUsecase } from '@/modules/challenge/usecase/add-challenge-member.usecase';
import { CreateChallengeInviteCodeUsecase } from '@/modules/challenge/usecase/create-challenge-invite-code.usecase';
import { ChallengeInviteCodeRepository } from '@/modules/challenge/domain/challenge/challenge-invite-code.repository';
import { GetChallengeInviteCodeUsecase } from './usecase/get-challenge-invite-code.usecase';

@Module({
  imports: [AuthModule],
  controllers: [ChallengeController, ChallengeMemberController],
  providers: [
    CreateChallengeUseCase,
    AddChallengeMemberUsecase,
    GetChallengesByUserIdUsecase,
    GetChallengeInviteCodeUsecase,
    CreateChallengeInviteCodeUsecase,
    ChallengeInviteCodeRepository,
    ChallengeRepository,
  ],
})
export class ChallengeModule {}
