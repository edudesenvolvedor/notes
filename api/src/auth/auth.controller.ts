import { Body, Controller, Post } from '@nestjs/common';
import { SignIn } from './dto/signin-user.dto';
import { AuthService } from './auth.service';
import { Login } from './dto/login-user.dto';
import { SignUp } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInUser: SignIn) {
    return this.authService.signIn(signInUser);
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
