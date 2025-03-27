import { Injectable } from '@nestjs/common';
import { RefreshToken } from './dto/refresh.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordChange } from './dto/password-change.dto';
import {
  encryptPassword,
  generationTokenToRecoveryPassword,
  validatePassword,
  verifyJwt,
} from '../services/security';
import { RecoveryPassword } from './dto/recovery-password.dto';
import { sendEmailRecoveryAccount } from '../services/email';
import { RecoveryToken } from './entities/recovery-token.entity';
import { ChangePasswordAfterRecovery } from './dto/change-password-after-recovery.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RecoveryToken)
    private readonly recoveryPasswordRepository: Repository<RecoveryToken>,
    private readonly jwtService: JwtService,
  ) {}

  async refresh(data: RefreshToken) {
    const jwt = verifyJwt(data.token);
    if (!jwt) return { success: false };

    const user = await this.userRepository.findOneBy({ id: jwt.id });
    if (!user) return { success: false };

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { success: true, token };
  }

  async me(userReq: any) {
    const user = await this.userRepository.findOne({
      where: { id: userReq.id },
    });

    if (!user) return { success: false };

    return { success: true, user };
  }

  async changePassword(
    { password_current, new_password }: PasswordChange,
    user: User,
  ) {
    const userFind = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: user.id })
      .getOne();

    if (
      !userFind ||
      !(await validatePassword(password_current, userFind.password))
    ) {
      return { success: false };
    }

    userFind.password = await encryptPassword(new_password);

    await this.userRepository.update(user.id, userFind);

    return { success: true, user: userFind };
  }

  async recoveryPassword({ email }: RecoveryPassword) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) return { success: false };

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 12);

    const token = await generationTokenToRecoveryPassword();
    const recoveryToken = this.recoveryPasswordRepository.create({
      email,
      token,
      validate_token: expirationDate.toISOString(),
    });

    await this.recoveryPasswordRepository.save(recoveryToken);
    await sendEmailRecoveryAccount(user.email, token);

    return { success: true };
  }

  async changePasswordAfterRecovery(
    { new_password }: ChangePasswordAfterRecovery,
    token: string,
  ) {
    const recovery = await this.recoveryPasswordRepository.findOneBy({ token });
    if (!recovery) return { success: false };

    const hashedPassword = await encryptPassword(new_password);
    const userUpdate = await this.userRepository.update(
      { email: recovery.email },
      { password: hashedPassword },
    );

    return { success: true, user: userUpdate };
  }
}
