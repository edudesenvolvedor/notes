import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignIn, SignInSchema } from './dto/signin-user.dto';
import { AuthService } from './auth.service';
import { Login, LoginSchema } from './dto/login-user.dto';
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
  async login(@Body() login: Login) {
    try {
      LoginSchema.parse(login);

      const result = await this.authService.login(login);

      if (!result.success) {
        throw new InvalidCredentials();
      }

      return {
        success: true,
        id: result.id,
        email: result.email,
        access_token: result.access_token,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        throw new HttpException(zodFormatError(error), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('signup')
  signUp(@Body() signUp: SignUp) {
    return this.authService.signUp(signUp);
  }
}
