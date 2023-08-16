import { applyDecorators, Type as NestType } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Column } from 'typeorm';

export class Item {
  @ApiProperty({})
  @Expose()
  id: string;
}

export class ListResponseDto {
  @ApiProperty({ type: [Item] })
  @Expose()
  @Type(() => Item)
  data: Item[];

  @ApiProperty({})
  @Expose()
  @Column({ name: 'page' })
  currentPage: number;

  @ApiProperty({})
  @Expose()
  totalPage: number;

  @ApiProperty({})
  @Expose()
  totalRecord: number;
}

export class PaginatedResponseDto<T> {
  @Expose()
  data: T[];

  @ApiProperty({})
  @Expose()
  currentPage: number;

  @ApiProperty({})
  @Expose()
  totalPage: number;

  @ApiProperty({})
  @Expose()
  pageSize: number;

  @ApiProperty({})
  @Expose()
  totalRecord: number;
}

export const ApiOkResponsePaginated = <DataDto extends NestType<unknown>>(dataDto: DataDto) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
};
