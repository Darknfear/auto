import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginDtoResponse {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  id: string;
}
