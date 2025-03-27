import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryToken } from './entities/recovery-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RecoveryToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '86400s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
