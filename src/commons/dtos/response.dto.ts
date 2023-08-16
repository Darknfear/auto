import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DatabaseResponse {
  @ApiResponseProperty()
  @Expose()
  id: string;

  @ApiResponseProperty()
  @Expose({ name: 'created_at' })
  createdAt: string;

  @ApiResponseProperty()
  @Expose({ name: 'updated_at' })
  updatedAt: string;
}
