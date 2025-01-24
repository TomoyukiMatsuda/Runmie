import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';

@Injectable()
export class AddChallengeMemberUsecase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(params: { userId: string; challengeId: string }) {
    const challenge = await this.challengeRepository.findById(
      params.challengeId,
    );
    if (!challenge?.id) {
      throw new NotFoundException('Challenge not found');
    }
    const newMember = challenge.addMember(params.userId);

    await this.challengeRepository.createMember({
      challengeId: challenge.id,
      member: newMember,
    });
  }
}
