import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import { ChallengeInviteCodeRepository } from '@/modules/challenge/domain/challenge/challenge-invite-code.repository';
import { ValidationError } from 'class-validator';

@Injectable()
export class AddChallengeMemberUsecase {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly challengeinInviteCodeRepository: ChallengeInviteCodeRepository,
  ) {}

  async execute(params: { userId: string; inviteCode: string }) {
    const inviteCode = await this.challengeinInviteCodeRepository.findByCode(
      params.inviteCode,
    );
    if (!inviteCode || !inviteCode.isValid()) {
      throw new NotFoundException('Invite code not found');
    }
    const challenge = await this.challengeRepository.findById(
      inviteCode.challengeId,
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
