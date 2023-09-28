import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { PATTERN_NAMES, ExceptionFilter } from '../common';
import { CreateUserDto, UpdateUserDto } from './dtos';

@UseFilters(new ExceptionFilter())
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(PATTERN_NAMES.CREATE_USER)
  async createUser(@Payload() createUserDto: CreateUserDto) {
    const result = await this.userService.createUser(createUserDto);
    return result;
  }

  @MessagePattern(PATTERN_NAMES.UPDATE_USER)
  updateUser(
    @Payload('id') id: string,
    @Payload('data') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @MessagePattern(PATTERN_NAMES.DELETE_USER)
  deleteUser(@Payload() userId: string) {
    return this.userService.deleteUser(userId);
  }

  @MessagePattern(PATTERN_NAMES.GET_USER_BY_EMAIL)
  getUserByEmail(@Payload() email: string) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern(PATTERN_NAMES.GET_USERS)
  getUsers() {
    return this.userService.getUsers();
  }
}
