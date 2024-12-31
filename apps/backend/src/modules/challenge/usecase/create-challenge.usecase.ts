import { Injectable } from '@nestjs/common';
import { ChallengeRepository } from '@/modules/challenge/domain/repository/challenge.repository';
import {
  ChallengeEntity,
  ChallengeStatus,
} from '@/modules/challenge/domain/entity/challenge.entity';

@Injectable()
export class CreateChallengeUseCase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(params: {
    creatorId: string;
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
  }): Promise<{
    challenge: {
      id: string;
      title: string;
      description: string | null;
      targetDate: Date;
      status: ChallengeStatus;
      members: {
        userId: string;
        role: string;
      }[];
    };
  }> {
    const newChallenge = ChallengeEntity.create({
      creatorId: params.creatorId,
      title: params.title,
      description: params.description,
      targetDate: params.targetDate,
      status: params.status,
    });
    const result = await this.challengeRepository.create(newChallenge);
    if (!result.id) {
      throw new Error('Failed to create challenge');
    }

    return {
      challenge: {
        id: result.id,
        title: result.title,
        description: result.description,
        targetDate: result.targetDate,
        status: result.status,
        members: result.members,
      },
    };
  }
}
