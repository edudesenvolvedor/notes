import { Injectable } from '@nestjs/common';
import { encryptPassword, validatePassword } from '../services/security';
import { SignIn, SignInSchema } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './dto/login-user.dto';
import { SignUp } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signIn: SignIn) {
    const existingUser = await this.userRepository.findOneBy({
      email: signIn.email,
    });
    if (existingUser) return { success: false };

    const user = await this.createUser(
      signIn.name,
      signIn.email,
      signIn.password,
    );

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      success: true,
      id: user.id,
      email: user.email,
      access_token,
    };
  }

  async signUp(signUp: SignUp) {
    const userDTO: null | SignUp = this.validateUser(signUp);
    if (!userDTO) return null;

    const payload = {
      id: 0,
      name: userDTO.name,
      email: userDTO.email,
    };

    const { email } = await this.createUser(
      userDTO.name,
      userDTO.email,
      userDTO.password,
    );

    return {
      id: 0,
      email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(login: Login) {
    const { email, password } = login;
    const user = await this.userRepository.findOneOrFail({
      where: { email },
    });

    if (!user) return null;

    if (!(await validatePassword(password, user.password))) return null;

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      name: user.name,
      email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(name: string, email: string, password: string) {
    return this.userRepository.save({
      name,
      email,
      password: await encryptPassword(password),
    });
  }

  validateUser(user: SignIn) {
    const parsed = SignInSchema.safeParse(user);

    if (!parsed) return null;

    return user;
  }
}
