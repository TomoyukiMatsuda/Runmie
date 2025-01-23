/**
 * model ChallengeProcessMessage {
 *   id          String                    @id @default(cuid()) @db.Char(25)
 *   content     String                    @db.Text
 *   userId      String                    @map("user_id") @db.Char(25)
 *   challengeId String                    @map("challenge_id") @db.Char(25)
 *   activityId  String?                   @map("activity_id") @db.Char(25)
 *   member      ChallengeMember           @relation(fields: [userId, challengeId], references: [userId, challengeId])
 *   user        User                      @relation(fields: [userId], references: [id])
 *   process     ChallengeProcess          @relation(fields: [challengeId], references: [challengeId])
 *   activity    ChallengeProcessActivity? @relation(fields: [activityId], references: [id])
 *   createdAt   DateTime                  @default(now()) @map("created_at") @db.Timestamp
 * }
 */
export class ChallengeProcessMessageEntity {
  readonly id: string | undefined;
  readonly content: string;
  readonly userId: string;
  readonly challengeId: string;
  readonly activityId: string | null;
  readonly createdAt: Date | undefined;

  private constructor(params: {
    id: string | undefined;
    content: string;
    userId: string;
    challengeId: string;
    activityId: string | null;
    createdAt: Date | undefined;
  }) {
    this.id = params.id;
    this.content = params.content;
    this.userId = params.userId;
    this.challengeId = params.challengeId;
    this.activityId = params.activityId;
    this.createdAt = params.createdAt;
  }

  static create(params: {
    content: string;
    userId: string;
    challengeId: string;
    activityId: string | null;
  }): ChallengeProcessMessageEntity {
    return new ChallengeProcessMessageEntity({
      ...params,
      id: undefined,
      createdAt: undefined,
    });
  }

  static toEntity(params: {
    id: string;
    content: string;
    userId: string;
    challengeId: string;
    activityId: string | null;
    createdAt: Date;
  }): ChallengeProcessMessageEntity {
    return new ChallengeProcessMessageEntity({
      ...params,
    });
  }
}
