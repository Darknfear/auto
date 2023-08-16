import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';
import { ICustomRequest } from '../interfaces/custom-request';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: ICustomRequest = ctx.getRequest();
    const res: Response = ctx.getResponse();

    if (error instanceof TypeORMError) {
      Logger.error(error.message, error['query']);
      console.log(
        '🚀 ~ file: http-exception.filter.ts:13 ~ HttpExceptionFilter ~ error:',
        error.message,
        error['query'],
      );
      error = new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const status = typeof error.getStatus === 'function' ? error.getStatus() : HttpStatus.BAD_REQUEST;

    return res.status(status).json({
      statusCode: status,
      error: error?.response?.name || error?.name,
      errorType: error?.response?.errorType || null,
      id: error?.response?.id || null,
      message: error?.response?.message || error?.message,
      timestamp: new Date().toISOString(),
      path: req?.url || null,
    });
  }
}
