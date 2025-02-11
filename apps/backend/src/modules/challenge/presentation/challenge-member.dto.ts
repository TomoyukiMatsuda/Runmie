import { IsNotEmpty, IsString } from 'class-validator';

export class ChallengeMemberAddDto {
  @IsString({ message: 'InviteCodeが文字列ではありません' })
  @IsNotEmpty({ message: 'InviteCodeが空です' })
  readonly inviteCode!: string;
}
