import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChangePasswordDto, ResetPasswordDto, SignInDto } from './dtos';
import { ExceptionFilter, PATTERN_NAMES } from '../common';

@UseFilters(new ExceptionFilter())
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(PATTERN_NAMES.SIGN_IN)
  async signIn(@Payload() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto);
    return result;
  }

  @MessagePattern(PATTERN_NAMES.REQUEST_RESET_PASSWORD)
  async requestResetPassword(@Payload() email: string) {
    const result = await this.authService.requestResetPassword(email);
    return result;
  }

  @MessagePattern(PATTERN_NAMES.RESET_PASSWORD)
  async resetPassword(@Payload() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return result;
  }

  @MessagePattern(PATTERN_NAMES.CHANGE_PASSWORD)
  async changePassword(@Payload() changePasswordDto: ChangePasswordDto) {
    const result = await this.authService.changePassword(changePasswordDto);
    return result;
  }
}
