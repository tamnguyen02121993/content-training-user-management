import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { hash } from 'bcrypt';
import { User } from '../entities';
import { ChangePasswordDto, ResetPasswordDto, SignInDto } from './dtos';
import {
  MAIL_PATTERNS,
  MODULE_NAMES,
  handleErrorMessage,
  randomString,
} from '../common';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(MODULE_NAMES.MAIL_CLIENT_MICROSERVICE)
    private readonly mailClient: ClientKafka,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const payload = {
        sub: signInDto.id,
        email: signInDto.email,
        name: `${signInDto.firstName} ${signInDto.lastName}`,
        permissions: signInDto.permissions,
      };

      const accessToken = await this.jwtService.signAsync(payload);
      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async requestResetPassword(email: string) {
    try {
      const token = randomString();
      await this.usersRepository.update(
        {
          email,
        },
        {
          resetPasswordToken: token,
        },
      );
      this.mailClient.emit(MAIL_PATTERNS.REQUEST_RESET_PASSWORD, {
        email,
        token,
        link: '',
      });
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: resetPasswordDto.email,
      });
      if (!user) {
        throw new Error(`Email ${resetPasswordDto.email} doesn\'t exists`);
      }

      if (resetPasswordDto.token !== user.resetPasswordToken) {
        throw new Error(`Reset password token invalid`);
      }
      const hashPassword = await hash(resetPasswordDto.newPassword, 10);
      await this.usersRepository.update(
        {
          email: resetPasswordDto.email,
        },
        {
          password: hashPassword,
          resetPasswordToken: '',
        },
      );
      this.mailClient.emit(MAIL_PATTERNS.RESET_PASSWORD, {
        email: resetPasswordDto.email,
      });
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const hashPassword = await hash(changePasswordDto.newPassword, 10);
      await this.usersRepository.update(
        {
          id: changePasswordDto.id,
        },
        {
          password: hashPassword,
        },
      );
      this.mailClient.emit(MAIL_PATTERNS.CHANGE_PASSWORD, {
        email: changePasswordDto.email,
      });
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }
}
