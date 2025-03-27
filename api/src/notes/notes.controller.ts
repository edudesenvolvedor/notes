import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNote, CreateNoteSchema } from './dto/create-note.dto';
import { UpdateNote } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InternalServerErrorException } from '../helpers/exception/http-exception';
import { z } from 'zod';
import { zodFormatError } from '../helpers/exception/zod-format-error';
import { InvalidCredentials } from '../helpers/exception/auth-http-exception';
import {
  InvalidIDFormatException,
  NoteNotFoundException,
} from '../helpers/exception/notes-http-exception';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createNote: CreateNote, @Req() req: any) {
    try {
      CreateNoteSchema.parse(createNote);

      const newNote = await this.notesService.create(createNote, req.user);

      if (!newNote.success) throw new InvalidCredentials();

      return {
        success: true,
        message: 'Note created successfully',
        note: newNote,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(zodFormatError(error), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: any) {
    try {
      const notes = await this.notesService.findAll(req.user);

      return {
        success: true,
        notes,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req: any) {
    try {
      const noteId = +id;

      if (isNaN(noteId)) {
        throw new InvalidIDFormatException();
      }

      const note = await this.notesService.findOne(noteId, req.user);

      return {
        success: true,
        note,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateNote: UpdateNote,
    @Req() req: any,
  ) {
    try {
      const noteId = +id;
      if (isNaN(noteId)) {
        throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
      }

      const updatedNote = await this.notesService.update(
        noteId,
        updateNote,
        req.user,
      );

      if (!updatedNote) {
        throw new NoteNotFoundException();
      }

      return {
        success: true,
        message: 'Note updated successfully',
        note: updatedNote,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    try {
      const noteId = +id;
      if (isNaN(noteId)) {
        throw new InvalidIDFormatException();
      }
      const deleted = await this.notesService.remove(noteId, req.user);

      if (!deleted.success) throw new NoteNotFoundException();
      return {
        success: true,
        message: 'Note deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
