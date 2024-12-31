import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString({ message: 'タイトルが不正な文字です' })
  @IsNotEmpty({ message: 'タイトルが空です' })
  readonly title!: string;

  @IsString({ message: '詳細が不正な文字です' })
  readonly description!: string;

  @IsDate({ message: '目標日は日付で指定してください' }) // 年月日だけで受け付けたい
  @IsNotEmpty({ message: '目標日が空です' })
  readonly targetDate!: Date;

  @IsIn(['draft', 'active', 'completed'], {
    message: 'ステータスが不正な文字です',
  })
  @IsNotEmpty({ message: 'ステータスが空です' })
  readonly status!: 'draft' | 'active' | 'completed';
}
