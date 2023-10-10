import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  InsertResult,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Role } from '../entities';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dtos';
import {
  TableParamsDto,
  TableResultDto,
  generateTableDto,
  handleErrorMessage,
} from '../common';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<InsertResult> {
    try {
      const role: Role = {
        name: createRoleDto.name,
        description: createRoleDto.description,
        rolePermissions: [],
        userRoles: [],
        updatedBy: '2d090879-f5de-4e0a-8be1-9b8b626c8764',
      };
      const result = await this.rolesRepository.insert(role);
      return { ...result };
    } catch (error) {}
  }

  async getRoles(
    tableParamsDto: TableParamsDto,
  ): Promise<TableResultDto<RoleDto>> {
    try {
      let options: FindManyOptions<Role> = {
        skip: (tableParamsDto.currentPage - 1) * tableParamsDto.pageSize,
        take: tableParamsDto.pageSize,
      };
      if (tableParamsDto.search) {
        options = {
          ...options,
          where: {
            name: Like(`%${tableParamsDto.search}`),
          },
        };
      }
      if (tableParamsDto.sortField) {
        options = {
          ...options,
          order: {
            [tableParamsDto.sortField]:
              tableParamsDto.sortOrder === 'descend' ? 'DESC' : 'ASC',
          },
        };
      }

      const result = await this.rolesRepository.findAndCount(options);
      const data = result[0].map((role) => {
        return {
          ...role,
        } as RoleDto;
      });

      return generateTableDto<RoleDto>(
        data,
        result[1],
        tableParamsDto.pageSize,
        tableParamsDto.currentPage,
      );
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async getRoleById(id: string): Promise<RoleDto> {
    try {
      const role = await this.rolesRepository.findOneBy({
        id,
      });
      return { ...role } as RoleDto;
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async updateRole(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    try {
      const result = await this.rolesRepository.update(id, updateRoleDto);
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async deleteRole(id: string): Promise<DeleteResult> {
    try {
      const result = await this.rolesRepository.delete(id);
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }
}
