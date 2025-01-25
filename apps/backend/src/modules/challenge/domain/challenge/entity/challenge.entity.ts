import { ChallengeStatus as PrismaChallengeStatus } from '@prisma/client';
import {
  ChallengeMemberEntity,
  ChallengeMemberRole,
} from '@/modules/challenge/domain/challenge/entity/challenge-member.entity';

// TODO: value objectに変更する
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
    status: 'draft' | 'active';
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

  addMember(userId: string) {
    const existsMember = this.members.some((m) => m.userId === userId);
    if (existsMember) {
      throw new Error('this member already exists');
    }

    const newMember = ChallengeMemberEntity.create({
      userId,
      role: 'member',
    });
    this.members.push(newMember);

    return newMember;
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
      members: params.members.map((member) =>
        ChallengeMemberEntity.toEntity(member),
      ),
    });
  }
}
