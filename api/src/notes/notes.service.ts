import { Injectable } from '@nestjs/common';
import { CreateNote } from './dto/create-note.dto';
import { UpdateNote } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';

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

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const note = this.notesRepository.create({
      ...createNote,
      user,
    });

    return await this.notesRepository.save(note);
  }

  async findAll(userReq: any) {
    return await this.notesRepository.find({
      where: { user: { id: userReq.id } },
      relations: ['user'],
    });
  }

  async findOne(id: number, userReq: any) {
    return await this.notesRepository.find({
      where: { id, user: { id: userReq.id } },
      relations: ['user'],
    });
  }

  async update(id: number, updateNote: UpdateNote, userReq: any) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!note) {
      throw new Error('Nota não encontrada');
    }

    if (note.user.id !== userReq.id) {
      throw new Error('Você não tem permissão para editar esta nota');
    }

    Object.assign(note, updateNote);

    return await this.notesRepository.save(note);
  }

  async remove(id: number, userReq: any) {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!note) {
      throw new Error('Nota não encontrada');
    }

    if (note.user.id !== userReq.id) {
      throw new Error('Você não tem permissão para excluir esta nota');
    }

    const result = await this.notesRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new Error('Falha ao tentar excluir a nota');
    }

    return { message: 'Nota deletada com sucesso' };
  }
}
