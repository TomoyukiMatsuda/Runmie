import { IsNotEmpty, IsString } from 'class-validator';
import { ValidateExactProps } from '@/libs/validateExactParams';
import { ApiParams } from '@shared/types/apiConst';

export class ChallengeMemberAddDto
  implements ValidateExactProps<ChallengeMemberAddDto, ApiParams<'/challenge_members', 'post'>>
{
  @IsString({ message: 'InviteCodeが文字列ではありません' })
  @IsNotEmpty({ message: 'InviteCodeが空です' })
  readonly inviteCode!: string;
}

export class ChallengeInviteCodeCreateDto
  implements ValidateExactProps<ChallengeInviteCodeCreateDto, ApiParams<'/challenge_members/invite_code', 'post'>>
{
  @IsString({ message: 'ChallengeIdが文字列ではありません' })
  @IsNotEmpty({ message: 'ChallengeIdが空です' })
  readonly challengeId!: string;
}

export class ChallengeInviteCodeGetDto
  implements ValidateExactProps<ChallengeInviteCodeGetDto, ApiParams<'/challenge_members/invite_code', 'get'>>
{
  @IsString({ message: 'ChallengeIdが文字列ではありません' })
  @IsNotEmpty({ message: 'ChallengeIdが空です' })
  readonly challengeId!: string;
}
