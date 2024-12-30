import { ChallengeStatus as PrismaChallengeStatus } from '@prisma/client';

export type ChallengeStatus = PrismaChallengeStatus;

export class Challenge {
  readonly id: string | undefined;
  readonly title: string;
  readonly description: string | null;
  readonly targetDate: Date;
  readonly status: ChallengeStatus;
  readonly processId: string;

  // process: ChallengeProcess  @relation(fields: [processId], references: [id])
  // members    ChallengeMember[]
  // activities Activity[]

  private constructor(params: {
    id?: string;
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
    processId: string;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.targetDate = params.targetDate;
    this.status = params.status;
    this.processId = params.processId;
  }

  static create(params: {
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
    processId: string;
  }): Challenge {
    return new Challenge({
      ...params,
    });
  }

  update(params: {
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
  }): Challenge {
    return new Challenge({
      ...params,
      processId: this.processId,
    });
  }

  static toEntity(params: {
    id: string;
    title: string;
    description: string | null;
    targetDate: Date;
    status: ChallengeStatus;
    processId: string;
  }): Challenge {
    return new Challenge({
      ...params,
    });
  }
}
