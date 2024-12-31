export class ChallengeProcessActivityEntity {
  readonly id: string | undefined;
  readonly userId: string;
  readonly challengeId: string;
  readonly distance: number;
  readonly duration: number;
  readonly date: Date;
  readonly note: string | null;
  readonly imageUrl: string | null;
  readonly createdAt: Date | undefined;

  private constructor(params: {
    id: string | undefined;
    userId: string;
    challengeId: string;
    distance: number;
    duration: number;
    date: Date;
    note: string | null;
    imageUrl: string | null;
    createdAt: Date | undefined;
  }) {
    this.id = params.id;
    this.userId = params.userId;
    this.challengeId = params.challengeId;
    this.distance = params.distance;
    this.duration = params.duration;
    this.date = params.date;
    this.note = params.note;
    this.imageUrl = params.imageUrl;
    this.createdAt = params.createdAt;
  }

  static create(params: {
    userId: string;
    challengeId: string;
    distance: number;
    duration: number;
    date: Date;
    note: string | null;
    imageUrl: string | null;
  }): ChallengeProcessActivityEntity {
    return new ChallengeProcessActivityEntity({
      ...params,
      id: undefined,
      createdAt: undefined,
    });
  }
}
