import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidRefreshTokenException extends HttpException {
  constructor() {
    super('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  }
}

export class PasswordIncorrectException extends HttpException {
  constructor() {
    super('Password is incorrect', HttpStatus.FORBIDDEN);
  }
}

export class EmailInvalidException extends HttpException {
  constructor() {
    super('Email not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidOrExpiredTokenException extends HttpException {
  constructor() {
    super('Invalid or expired token', HttpStatus.FORBIDDEN);
  }
}
