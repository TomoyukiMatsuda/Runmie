import { ChallengeMemberRole as PrismaChallengeMemberRole } from '@prisma/client';

export type ChallengeMemberRole = PrismaChallengeMemberRole;

export class ChallengeMemberEntity {
  readonly userId: string;
  readonly challengeId: string;
  readonly role: PrismaChallengeMemberRole;

  private constructor(params: {
    userId: string;
    challengeId: string;
    role: ChallengeMemberRole;
  }) {
    this.userId = params.userId;
    this.challengeId = params.challengeId;
    this.role = params.role;
  }

  static create(params: {
    userId: string;
    challengeId: string;
    role: ChallengeMemberRole;
  }): ChallengeMemberEntity {
    return new ChallengeMemberEntity({
      ...params,
    });
  }

  static toEntity(params: {
    userId: string;
    challengeId: string;
    role: ChallengeMemberRole;
  }): ChallengeMemberEntity {
    return new ChallengeMemberEntity({
      ...params,
    });
  }
}
