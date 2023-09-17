import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ShortLinkDto {
  @ApiProperty({
    type: String,
    example: 'https://www.youtube.com',
    description: 'Nhập url ',
  })
  @IsString()
  @IsNotEmpty({ message: 'Không để url bị rỗng' })
  url: string;
}
