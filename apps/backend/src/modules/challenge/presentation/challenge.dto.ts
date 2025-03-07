import { IsDateString, IsIn, IsNotEmpty, IsString, MinDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateExactProps } from '@/libs/validateExactParams';
import { ApiParams } from '@shared/types/apiConst';

export class CreateChallengeDto
  implements ValidateExactProps<CreateChallengeDto, Omit<ApiParams<'/challenges', 'post'>, 'targetDate'> & { targetDate: Date }>
{
  @IsString({ message: 'タイトルが不正な文字です' })
  @IsNotEmpty({ message: 'タイトルが空です' })
  readonly title!: string;

  @IsString({ message: '詳細が不正な文字です' })
  readonly description!: string | null;

  @IsNotEmpty({ message: '目標日が空です' })
  @IsDateString({}, { message: '目標日はYYYY-MM-DD形式で入力してください' })
  @Type(() => Date)
  @MinDate(new Date())
  readonly targetDate!: Date;

  @IsIn(['draft', 'active'], {
    message: 'ステータスが不正な文字です',
  })
  @IsNotEmpty({ message: 'ステータスが空です' })
  readonly status!: 'draft' | 'active';
}
