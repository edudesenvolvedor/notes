import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshToken } from './dto/refresh.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PasswordChange } from './dto/password-change.dto';
import { RecoveryPassword } from './dto/recovery-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('refresh')
  refresh(@Body() payload: RefreshToken) {
    return this.usersService.refresh(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return this.usersService.me(req);
  }

  @Post('password/change')
  @UseGuards(JwtAuthGuard)
  passwordChange(@Body() passwordChange: PasswordChange, @Req() req: any) {
    return this.usersService.changePassword(passwordChange, req.user);
  }

  @Post('password/recovery')
  recoveryPassword(@Body() recoveryPassword: RecoveryPassword) {
    return this.usersService.recoveryPassword(recoveryPassword);
  }

  @Post('password/recovery/:token')
  changePasswordAfterRecovery(
    @Body() changePasswordAfterRecovery: any,
    @Param('token') token: string,
  ) {
    return this.usersService.ChangePasswordAfterRecovery(
      changePasswordAfterRecovery,
      token,
    );
  }
}
