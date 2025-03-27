import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignIn, SignInSchema } from './dto/signin-user.dto';
import { AuthService } from './auth.service';
import { Login } from './dto/login-user.dto';
import { SignUp } from './dto/signup-user.dto';
import { InvalidCredentials } from '../helpers/exception/auth-http-exception';
import { InternalServerErrorException } from '../helpers/exception/http-exception';
import { z } from 'zod';
import { zodFormatError } from '../helpers/exception/zod-format-error';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInUser: SignIn) {
    try {
      SignInSchema.parse(signInUser);

      const token = await this.authService.signIn(signInUser);

      if (!token.success) {
        throw new InvalidCredentials();
      }

      return token;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(zodFormatError(error), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  login(@Body() login: Login) {
    return this.authService.login(login);
  }

  @Post('signup')
  signUp(@Body() signUp: SignUp) {
    return this.authService.signUp(signUp);
  }
}
