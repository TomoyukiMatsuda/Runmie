import { ChallengeStatus as PrismaChallengeStatus } from '@prisma/client';
import {
  ChallengeMemberEntity,
  ChallengeMemberRole,
} from '@/modules/challenge/domain/entity/challenge-member.entity';

export type ChallengeStatus = PrismaChallengeStatus;

export class ChallengeEntity {
  readonly id: string | undefined;
  readonly title: string;
  readonly description: string | null;
  readonly targetDate: Date;
  readonly status: ChallengeStatus;
  readonly members: ChallengeMemberEntity[];

  private constructor(params: {
    id: string | undefined;
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
    members: ChallengeMemberEntity[];
  }) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.targetDate = params.targetDate;
    this.status = params.status;
    this.members = params.members;
  }

  static create(params: {
    creatorId: string;
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
  }): ChallengeEntity {
    return new ChallengeEntity({
      id: undefined,
      ...params,
      members: [
        ChallengeMemberEntity.create({
          userId: params.creatorId,
          role: 'admin',
        }),
      ],
    });
  }

  update(params: {
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
  }): ChallengeEntity {
    return new ChallengeEntity({
      ...params,
      id: this.id,
      members: this.members,
    });
  }

  static toEntity(params: {
    id: string;
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
    members: {
      userId: string;
      role: ChallengeMemberRole;
    }[];
  }): ChallengeEntity {
    return new ChallengeEntity({
      ...params,
    });
  }
}
