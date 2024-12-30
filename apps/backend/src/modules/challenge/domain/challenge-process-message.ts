export class ChallengeProcess {
  readonly id: string;
  readonly challengeId: string;
  readonly messages: string[];

  constructor(readonly id: string) {}
}
