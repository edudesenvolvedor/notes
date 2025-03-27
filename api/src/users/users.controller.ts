import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshToken, RefreshTokenSchema } from './dto/refresh.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  PasswordChange,
  PasswordChangeSchema,
} from './dto/password-change.dto';
import {
  RecoveryPassword,
  RecoveryPasswordSchema,
} from './dto/recovery-password.dto';
import { z } from 'zod';
import { zodFormatError } from '../helpers/exception/zod-format-error';
import {
  EmailInvalidException,
  InvalidRefreshTokenException,
  PasswordIncorrectException,
  UserNotFoundException,
} from '../helpers/exception/users-http-exception';
import { InternalServerErrorException } from '../helpers/exception/http-exception';
import {
  ChangePasswordAfterRecovery,
  ChangePasswordAfterRecoverySchema,
} from './dto/change-password-after-recovery.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Body() payload: RefreshToken) {
    try {
      RefreshTokenSchema.parse(payload);

      const result = await this.usersService.refresh(payload);

      if (!result.success) {
        throw new InvalidRefreshTokenException();
      }

      return result;
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: any) {
    try {
      const user = await this.usersService.me(req.user.id);

      if (!user.success) {
        throw new UserNotFoundException();
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('password/change')
  @UseGuards(JwtAuthGuard)
  async passwordChange(
    @Body() passwordChange: PasswordChange,
    @Req() req: any,
  ) {
    try {
      PasswordChangeSchema.parse(passwordChange);

      const result = await this.usersService.changePassword(
        passwordChange,
        req.user,
      );

      if (!result.success) {
        throw new PasswordIncorrectException();
      }

      return {
        message: 'Password changed successfully',
      };
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

  @Post('password/recovery')
  async recoveryPassword(@Body() recoveryPassword: RecoveryPassword) {
    try {
      RecoveryPasswordSchema.parse(recoveryPassword);

      const result = await this.usersService.recoveryPassword(recoveryPassword);

      if (!result.success) {
        throw new EmailInvalidException();
      }
      return {
        message: 'Password recovery link sent successfully.',
      };
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

  @Post('password/recovery/:token')
  async changePasswordAfterRecovery(
    @Body() changePasswordAfterRecovery: ChangePasswordAfterRecovery,
    @Param('token') token: string,
  ) {
    try {
      ChangePasswordAfterRecoverySchema.parse(changePasswordAfterRecovery);

      const result = await this.usersService.changePasswordAfterRecovery(
        changePasswordAfterRecovery,
        token,
      );

      if (!result.success) {
        throw new InvalidRefreshTokenException();
      }

      return {
        message: 'Password successfully changed.',
      };
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
}
