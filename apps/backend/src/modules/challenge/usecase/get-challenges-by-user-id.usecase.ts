import { Injectable } from '@nestjs/common';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import {
  ChallengeEntity,
  ChallengeStatus,
} from '@/modules/challenge/domain/challenge/entity/challenge.entity';

@Injectable()
export class GetChallengesByUserIdUsecase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(params: { userId: string }): Promise<
    {
      id: string;
      title: string;
      description: string | null;
      targetDate: Date;
      status: ChallengeStatus;
      members: {
        userId: string;
        role: 'admin' | 'member';
      }[];
    }[]
  > {
    return this.challengeRepository
      .findByUserId(params.userId)
      .then((challenges) =>
        challenges.map((challenge) => ({
          ...challenge,
          // TODO: id が undefined の場合の処理がしんどい
          id: challenge.id ?? '',
        })),
      );
  }
}
