import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { hash } from 'bcrypt';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import {
  MAIL_PATTERNS,
  MODULE_NAMES,
  handleErrorMessage,
  randomString,
} from '../common';
import { User } from '../entities';
import { UserDto, UpdateUserDto, CreateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(MODULE_NAMES.MAIL_CLIENT_MICROSERVICE)
    private readonly mailClient: ClientKafka,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const randomPassword = randomString();
      const password = await hash(randomPassword, 10);
      const user: User = {
        email: createUserDto.email,
        country: createUserDto.country,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        globalId: createUserDto.globalId,
        officeCode: createUserDto.officeCode,
        updatedBy: '2d090879-f5de-4e0a-8be1-9b8b626c8764',
        password,
        userRoles: [],
      };

      const result = await this.usersRepository.insert(user);
      this.mailClient.emit(MAIL_PATTERNS.REGISTER, {
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        password: randomPassword,
      });
      return { ...result };
    } catch (error) {
      console.log(error);
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async getUsers(): Promise<UserDto[]> {
    try {
      const users = await this.usersRepository.find();
      return users.map((user) => {
        return {
          ...user,
        } as UserDto;
      });
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
        relations: {
          userRoles: {
            role: true,
          },
        },
      });
      return { ...user } as UserDto;
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const result = await this.usersRepository.update(id, updateUserDto);
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const result = await this.usersRepository.delete(id);
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }
}