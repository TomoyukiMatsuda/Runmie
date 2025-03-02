import { IsNotEmpty, IsString } from 'class-validator';

export class ChallengeMemberAddDto {
  @IsString({ message: 'InviteCodeが文字列ではありません' })
  @IsNotEmpty({ message: 'InviteCodeが空です' })
  readonly inviteCode!: string;
}

export class ChallengeInviteCodeCreateDto {
  @IsString({ message: 'ChallengeIdが文字列ではありません' })
  @IsNotEmpty({ message: 'ChallengeIdが空です' })
  readonly challengeId!: string;
}

export class ChallengeInviteCodeGetDto {
  @IsString({ message: 'ChallengeIdが文字列ではありません' })
  @IsNotEmpty({ message: 'ChallengeIdが空です' })
  readonly challengeId!: string;
}
