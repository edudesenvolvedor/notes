import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { RecoveryToken } from './users/entities/recovery-token.entity';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.cache/db.sqlite',
      entities: [User, RecoveryToken],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotesModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [],
})
export class AppModule {}
