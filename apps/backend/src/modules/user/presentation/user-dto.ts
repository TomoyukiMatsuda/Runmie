import { IsNotEmpty, IsString } from 'class-validator';
import { ApiParams } from '../../../../../../shared/types/apiConst';
import { ValidateExactProps } from '@/libs/validateExactParams';

export class UpdateUserDto
  implements ValidateExactProps<UpdateUserDto, ApiParams<'/me', 'patch'>>
{
  @IsString({ message: '不正な文字です' })
  @IsNotEmpty({ message: '文字が空です' })
  readonly name!: string;
}
