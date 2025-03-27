import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryToken } from './entity/recovery-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RecoveryToken])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
