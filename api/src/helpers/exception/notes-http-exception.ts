import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIDFormatException extends HttpException {
  constructor() {
    super('Invalid ID format', HttpStatus.BAD_REQUEST);
  }
}

export class NoteNotFoundException extends HttpException {
  constructor() {
    super('Note not found', HttpStatus.NOT_FOUND);
  }
}
