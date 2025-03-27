import { Injectable } from '@nestjs/common';
import { RefreshToken } from './dto/refresh.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PasswordChange,
  PasswordChangeSchema,
} from './dto/password-change.dto';
import {
  encryptPassword,
  generationTokenToRecoveryPassword,
  validatePassword,
  verifyJwt,
} from '../services/security';
import { RecoveryPassword } from './dto/recovery-password.dto';
import { sendEmailRecoveryAccount } from '../services/email';
import { RecoveryToken } from './entity/recovery-token.entity';
import {
  ChangePasswordAfterRecovery,
  ChangePasswordAfterRecoverySchema,
} from './dto/change-password-after-recovery.dto';

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

    if (!jwt) return null;

    const user = await this.userRepository.findOneBy({
      id: jwt.id,
    });

    if (!user) return null;

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async me(userReq: any) {
    return this.userRepository.findOne({ where: { id: userReq.id } });
  }

  async changePassword(passwordChange: PasswordChange, user: User) {
    const parsedPassword = PasswordChangeSchema.safeParse(passwordChange);

    if (!parsedPassword.success) {
      return { success: false, errors: parsedPassword.error.errors };
    }

    const userFind = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: user.id })
      .getOne();

    if (
      !userFind ||
      !(await validatePassword(
        passwordChange.password_current,
        userFind.password,
      ))
    ) {
      return null;
    }

    userFind.password = await encryptPassword(passwordChange.new_password);

    const userWithNewPassword = await this.userRepository.update(
      user.id,
      userFind,
    );

    return { success: true, user: userWithNewPassword };
  }

  async recoveryPassword(recoveryPassword: RecoveryPassword) {
    const userFind = await this.userRepository.findOneBy({
      email: recoveryPassword.email,
    });

    if (!userFind) return null;

    const date = new Date();
    date.setHours(date.getHours() + 12);

    const recoveryToken = this.recoveryPasswordRepository.create({
      email: recoveryPassword.email,
      token: await generationTokenToRecoveryPassword(),
      validate_token: date.toISOString(),
    });

    await this.recoveryPasswordRepository.save(recoveryToken);

    await sendEmailRecoveryAccount(userFind.email, recoveryToken.token);

    return { success: true };
  }

  async ChangePasswordAfterRecovery(
    changePasswordAfterRecovery: ChangePasswordAfterRecovery,
    token: string,
  ) {
    const parsedPassword = ChangePasswordAfterRecoverySchema.safeParse(
      changePasswordAfterRecovery,
    );

    if (!parsedPassword.success)
      return { success: false, errors: parsedPassword.error.errors };

    const authorizationRecoveryFind =
      await this.recoveryPasswordRepository.findOneBy({
        token: token,
      });

    if (!authorizationRecoveryFind) return null;

    const userUpdate = await this.userRepository.update(
      { email: authorizationRecoveryFind.email },
      {
        password: await encryptPassword(
          changePasswordAfterRecovery.new_password,
        ),
      },
    );

    return {
      success: true,
      user: userUpdate,
    };
  }
}
