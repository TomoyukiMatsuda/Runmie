import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import { ChallengeInviteCodeRepository } from '@/modules/challenge/domain/challenge/challenge-invite-code.repository';

@Injectable()
export class CreateChallengeInviteCodeUsecase {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly challengeInviteCodeRepository: ChallengeInviteCodeRepository,
  ) {}

  async execute(params: { userId: string; challengeId: string }) {
    const challenge = await this.challengeRepository.findById(
      params.challengeId,
    );
    if (!challenge?.id) {
      throw new NotFoundException('Challenge not found');
    }
    if (
      challenge.members.find((m) => m.userId === params.userId)?.role !==
      'admin'
    ) {
      throw new Error('Only admin can create invite code');
    }

    return this.challengeInviteCodeRepository.create(params.challengeId);
  }
}
