import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;
  private readonly ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'development';

  constructor() {
    this.logger = new Logger();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { url, method, body, params, query } = request;

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // En este bloque de codigo hay un bug
    // let message = '';
    // switch (exception.constructor) {
    //   case InternalServerErrorException:
    //     message = 'Lo sentimos, ocurrió un error inesperado';
    //     break;
    //   case EntityNotFoundError:
    //     message = 'Lo sentimos, no encontramos la entidad solicitada';
    //     break;
    //   default:
    //     message = exception.message;
    //     break;
    // }
    // console.log(exception);

    const devErrorLogger: any = {
      timestamp: new Date().toISOString(),
      statusCode,
      message: exception?.message,
      path: url,
      method,
      body,
      params,
      query,
      errorName: exception?.name,
    };

    const originalError = exception.getResponse();

    const newResponse: any = {
      statusCode,
      message: originalError['message'],
      error: originalError['error'] ?? exception?.name,
    };

    this.logger.log(this.createMessageLog(devErrorLogger));
    this.logger.error(originalError['message']);

    return response.status(statusCode).json(newResponse);
  }

  private createMessageLog(devErrorLogger: any) {
    const {
      timestamp,
      statusCode,
      message,
      path,
      method,
      body,
      params,
      query,
      errorName,
    } = devErrorLogger;
    return `Resource: ${path}, time: ${timestamp}, status: ${statusCode}, method: ${method}, message: ${message}, params: ${JSON.stringify(
      params,
    )}, body: ${JSON.stringify(body)}, query: ${JSON.stringify(
      query,
    )}, errorName: ${errorName}`;
  }
}
