import { SortType } from '@constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ListRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform((params: TransformFnParams) => {
    const value = params?.value;
    return !value || isNaN(value) ? value : parseInt(value);
  })
  @IsNumber()
  @Min(0)
  page: number;

  @ApiProperty({
    description: 'Size / page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Transform((params: TransformFnParams) => {
    const value = params?.value;
    return !value || isNaN(value) ? value : parseInt(value);
  })
  @IsNumber()
  @Min(0)
  size: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  keyword: string;

  @ApiProperty({ required: false })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ enum: SortType, required: false })
  @IsOptional()
  @IsEnum(SortType)
  sortType?: SortType;
}
