import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(
      'An error occurred while processing your request. Please try again later.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
