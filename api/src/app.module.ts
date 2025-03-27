import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { RecoveryToken } from './users/entity/recovery-token.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.cache/db.sqlite',
      entities: [User, RecoveryToken],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController, UsersController], // OK
  providers: [],
})
export class AppModule {}
