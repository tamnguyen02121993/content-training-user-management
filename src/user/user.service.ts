import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { hash } from 'bcrypt';
import {
  DeleteResult,
  FindManyOptions,
  InsertResult,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  MAIL_PATTERNS,
  MODULE_NAMES,
  TableParamsDto,
  TableResultDto,
  generateTableDto,
  handleErrorMessage,
  randomString,
} from '../common';
import { Role, User, UserRoles } from '../entities';
import { UserDto, UpdateUserDto, CreateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(UserRoles)
    private readonly userRolesRepository: Repository<UserRoles>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    @Inject(MODULE_NAMES.MAIL_CLIENT_MICROSERVICE)
    private readonly mailClient: ClientKafka,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const randomPassword = randomString();
      const password = await hash(randomPassword, 10);
      const role = await this.rolesRepository.findOne({
        where: {
          name: 'user',
        },
      });
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
      await this.userRolesRepository.insert({
        roleId: role.id,
        userId: result.identifiers[0].id,
        assignedAt: new Date().toISOString(),
      });

      this.mailClient.emit(MAIL_PATTERNS.REGISTER, {
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        password: randomPassword,
      });
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async getUsers(
    tableParamsDto: TableParamsDto,
  ): Promise<TableResultDto<UserDto>> {
    try {
      let options: FindManyOptions<User> = {
        relations: {
          userRoles: {
            role: true,
          },
        },
        skip: (tableParamsDto.currentPage - 1) * tableParamsDto.pageSize,
        take: tableParamsDto.pageSize,
      };

      if (tableParamsDto.search) {
        options = {
          ...options,
          where: {
            email: Like(`%${tableParamsDto.search}%`),
          },
        };
      }
      if (tableParamsDto.sortField) {
        const sortOrder =
          tableParamsDto.sortOrder === 'descend' ? 'DESC' : 'ASC';
        options = {
          ...options,
          order: {
            [tableParamsDto.sortField]: sortOrder,
          },
        };

        if (tableParamsDto.sortField === 'fullName') {
          options = {
            ...options,
            order: {
              firstName: sortOrder,
              lastName: sortOrder,
            },
          };
        }
      }
      const result = await this.usersRepository.findAndCount(options);

      const data = result[0].map((user: User) => {
        delete user.resetPasswordToken;
        delete user.password;
        return {
          ...user,
        } as UserDto;
      });
      return generateTableDto<UserDto>(
        data,
        result[1],
        tableParamsDto.pageSize,
        tableParamsDto.currentPage,
      );
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
            role: {
              rolePermissions: {
                permission: true,
              },
            },
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
