import { ChallengeMemberRole as PrismaChallengeMemberRole } from '@prisma/client';

// TODO Value Objectに変更する
export type ChallengeMemberRole = PrismaChallengeMemberRole;

export class ChallengeMemberEntity {
  readonly userId: string;
  readonly role: ChallengeMemberRole;

  private constructor(params: { userId: string; role: ChallengeMemberRole }) {
    this.userId = params.userId;
    this.role = params.role;
  }

  static create(params: {
    userId: string;
    role: ChallengeMemberRole;
  }): ChallengeMemberEntity {
    return new ChallengeMemberEntity({
      ...params,
    });
  }

  static toEntity(params: {
    userId: string;
    role: ChallengeMemberRole;
  }): ChallengeMemberEntity {
    return new ChallengeMemberEntity({
      ...params,
    });
  }
}
