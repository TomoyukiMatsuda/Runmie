import { Injectable } from '@nestjs/common';
import { ChallengeRepository } from '@/modules/challenge/domain/challenge/challenge.repository';
import {
  ChallengeEntity,
  ChallengeStatus,
} from '@/modules/challenge/domain/challenge/entity/challenge.entity';

type Dto = {
  id: string;
  title: string;
  description: string | null;
  targetDate: Date;
  status: ChallengeStatus;
}[];
@Injectable()
export class GetChallengesByUserIdUsecase {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async execute(params: { userId: string }): Promise<Dto> {
    return this.challengeRepository.findByUserId(params.userId).then(
      (challenges) =>
        challenges.map((challenge) => ({
          // TODO: id が undefined の場合の処理がしんどい
          id: challenge.id ?? '',
          title: challenge.title,
          description: challenge.description,
          targetDate: challenge.targetDate,
          status: challenge.status,
        })) satisfies Dto,
    );
  }
}
