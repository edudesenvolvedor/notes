import { Injectable } from '@nestjs/common';
import { CreateNote } from './dto/create-note.dto';
import { UpdateNote } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createNote: CreateNote, userReq: any) {
    const user = await this.usersRepository.findOne({
      where: { id: userReq.id },
    });

    if (!user) return { success: false };

    const note = this.notesRepository.create({
      ...createNote,
      user,
    });

    return {
      success: true,
      ...(await this.notesRepository.save(note)),
    };
  }

  async findAll(userReq: any) {
    return await this.notesRepository.find({
      where: { user: { id: userReq.id } },
    });
  }

  async findOne(id: number, userReq: any) {
    return await this.notesRepository.find({
      where: { id, user: { id: userReq.id } },
    });
  }

  async update(id: number, updateNote: UpdateNote, userReq: any) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!note) return { success: false };

    if (note.user.id !== userReq.id) return { success: false };

    Object.assign(note, updateNote);

    return { success: true, ...(await this.notesRepository.save(note)) };
  }

  async remove(id: number, userReq: any) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!note) return { success: false };

    if (note.user.id !== userReq.id) return { success: false };

    const result = await this.notesRepository.softDelete({ id });

    if (result.affected === 0) return { success: false };

    return { success: true };
  }
}
