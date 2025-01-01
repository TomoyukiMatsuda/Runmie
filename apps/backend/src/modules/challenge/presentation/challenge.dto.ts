import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString({ message: 'タイトルが不正な文字です' })
  @IsNotEmpty({ message: 'タイトルが空です' })
  readonly title!: string;

  @IsString({ message: '詳細が不正な文字です' })
  readonly description!: string;

  // TODO 未来日付
  @IsDateString({}, { message: '目標日はYYYY-MM-DD形式で入力してください' })
  @IsNotEmpty({ message: '目標日が空です' })
  readonly targetDate!: Date;

  @IsIn(['draft', 'active'], {
    message: 'ステータスが不正な文字です',
  })
  @IsNotEmpty({ message: 'ステータスが空です' })
  readonly status!: 'draft' | 'active';
}
