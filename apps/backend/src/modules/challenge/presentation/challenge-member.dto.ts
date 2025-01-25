import { IsNotEmpty, IsString } from 'class-validator';

export class ChallengeMemberAddDto {
  // TODO: 招待コードに変更
  @IsString({ message: 'IDが不正な文字です' })
  @IsNotEmpty({ message: 'IDが空です' })
  readonly challengeId!: string;
}
