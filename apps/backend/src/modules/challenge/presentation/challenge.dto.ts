import {
  IsDate,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateChallengeDto {
  @IsString({ message: 'タイトルが不正な文字です' })
  @IsNotEmpty({ message: 'タイトルが空です' })
  readonly title!: string;

  @IsString({ message: '詳細が不正な文字です' })
  readonly description!: string;

  @Transform(({ value }) => {
    // YYYY-MM-DD 形式の文字列に変換
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return value;
  })
  @IsDateString({}, { message: '目標日はYYYY-MM-DD形式で入力してください' })
  @IsNotEmpty({ message: '目標日が空です' })
  readonly targetDate!: Date;

  @IsIn(['draft', 'active'], {
    message: 'ステータスが不正な文字です',
  })
  @IsNotEmpty({ message: 'ステータスが空です' })
  readonly status!: 'draft' | 'active';
}
