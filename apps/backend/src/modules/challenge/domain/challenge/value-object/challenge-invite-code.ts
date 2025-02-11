import { customAlphabet } from 'nanoid';

export class ChallengeInviteCode {
  private static readonly CODE_LENGTH = 8;
  private static readonly ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // 紛らわしい文字を除外
  private static readonly EXPIRATION_DAYS = 7;

  private constructor(
    readonly code: string,
    readonly challengeId: string,
    readonly createdAt: Date,
  ) {
    this.validateCode(code);
  }

  private validateCode(code: string): void {
    if (code.length !== ChallengeInviteCode.CODE_LENGTH) {
      throw new Error('Invalid code length');
    }

    if (!new RegExp(`^[${ChallengeInviteCode.ALPHABET}]+$`).test(code)) {
      throw new Error('Invalid code characters');
    }
  }

  static generateCode(): string {
    const nanoid = customAlphabet(
      ChallengeInviteCode.ALPHABET,
      ChallengeInviteCode.CODE_LENGTH,
    );
    return nanoid();
  }

  static reconstruct(params: {
    code: string;
    challengeId: string;
    createdAt: Date;
  }): ChallengeInviteCode {
    return new ChallengeInviteCode(
      params.code,
      params.challengeId,
      params.createdAt,
    );
  }

  isValid(): boolean {
    const now = new Date();
    const expirationDate = new Date(this.createdAt);
    expirationDate.setDate(
      expirationDate.getDate() + ChallengeInviteCode.EXPIRATION_DAYS,
    );

    return now <= expirationDate;
  }
}
