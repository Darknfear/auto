import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiException {
  @ApiProperty({})
  @Expose()
  statusCode: number;

  @ApiProperty({})
  @Expose()
  message: string;

  @ApiProperty({})
  @Expose()
  error: string;

  @ApiProperty({})
  @Expose()
  errorType: string;

  @ApiProperty({})
  @Expose()
  id: string;

  @ApiProperty({})
  @Expose()
  timestamp: string;

  @ApiProperty({})
  @Expose()
  path: string;
}

export class RedirectingException extends Error {
  constructor(public url: string, public error?: string | string[]) {
    super();
  }
}
