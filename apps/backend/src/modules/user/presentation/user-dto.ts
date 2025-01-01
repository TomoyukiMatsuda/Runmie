import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '不正な文字です' })
  @IsNotEmpty({ message: '文字が空です' })
  readonly name!: string;
}

export class UpdateUserDto {
  @IsString({ message: '不正な文字です' })
  @IsNotEmpty({ message: '文字が空です' })
  readonly name!: string;
}
