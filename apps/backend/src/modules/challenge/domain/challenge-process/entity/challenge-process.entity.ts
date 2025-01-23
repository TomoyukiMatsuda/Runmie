import { ChallengeProcessActivityEntity } from '@/modules/challenge/domain/challenge-process/entity/challenge-process-activity.entity';
import { ChallengeProcessMessageEntity } from '@/modules/challenge/domain/challenge-process/entity/challenge-process-message.entity';

/**
 * model ChallengeProcess {
 *   challengeId String                     @id @map("challenge_id") @db.Char(25)
 *   challenge   Challenge                  @relation(fields: [challengeId], references: [id])
 *   messages    ChallengeProcessMessage[]
 *   createdAt   DateTime                   @default(now()) @map("created_at") @db.Timestamp
 *   updatedAt   DateTime                   @updatedAt @map("updated_at") @db.Timestamp
 *   activities  ChallengeProcessActivity[]
 *
 *   @@unique([challengeId])
 *   @@map("challenge_processes")
 * }
 */
export class ChallengeProcessEntity {
  readonly challengeId: string;
  readonly messages: ChallengeProcessMessageEntity[];
  readonly activities: ChallengeProcessActivityEntity[];

  private constructor(params: {
    challengeId: string;
    activities: ChallengeProcessActivityEntity[];
    messages: ChallengeProcessMessageEntity[];
  }) {
    this.challengeId = params.challengeId;
    this.activities = params.activities;
    this.messages = params.messages;
  }

  static create(params: {
    challengeId: string;
    activities: ChallengeProcessActivityEntity[];
    messages: ChallengeProcessMessageEntity[];
  }): ChallengeProcessEntity {
    return new ChallengeProcessEntity({
      ...params,
    });
  }
}
