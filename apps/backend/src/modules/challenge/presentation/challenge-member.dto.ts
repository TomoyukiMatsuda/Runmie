import { IsNotEmpty, IsString } from 'class-validator';

export class ChallengeMemberAddDto {
  @IsString({ message: 'IDが不正な文字です' })
  @IsNotEmpty({ message: 'IDが空です' })
  readonly challengeId!: string;
}
