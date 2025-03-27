import { Injectable } from '@nestjs/common';
import { CreateNote } from './dto/create-note.dto';
import { UpdateNote } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNote) {
    const note = this.notesRepository.create(createNoteDto);

    const newNote = await this.notesRepository.save(note);

    if (!newNote) return null;

    return newNote;
  }

  async findAll() {
    return await this.notesRepository.find();
  }

  async findOne(id: number) {
    return await this.notesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateNote: UpdateNote) {
    return await this.notesRepository.update(id, updateNote);
  }

  async remove(id: number) {
    return await this.notesRepository.softDelete({ id: id });
  }
}
