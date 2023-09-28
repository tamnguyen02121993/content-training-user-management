import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Permission } from '../entities';
import { handleErrorMessage } from '../common';
import {
  CreatePermissionDto,
  PermissionDto,
  UpdatePermissionDto,
} from './dtos';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<InsertResult> {
    try {
      const permission: Permission = {
        name: createPermissionDto.name,
        description: createPermissionDto.description,
        code: createPermissionDto.code,
        permissionGroup: null,
        rolePermissions: [],
      };
      const result = await this.permissionsRepository.insert(permission);
      return { ...result };
    } catch (error) {}
  }

  async getPermissions(): Promise<PermissionDto[]> {
    try {
      const permissions = await this.permissionsRepository.find();
      return permissions.map((permission) => {
        return {
          ...permission,
        } as PermissionDto;
      });
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async getPermissionById(id: string): Promise<PermissionDto> {
    try {
      const permission = await this.permissionsRepository.findOneBy({
        id,
      });
      return { ...permission } as PermissionDto;
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async updatePermission(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    try {
      const result = await this.permissionsRepository.update(
        id,
        updatePermissionDto,
      );
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }

  async deletePermission(id: string): Promise<DeleteResult> {
    try {
      const result = await this.permissionsRepository.delete(id);
      return { ...result };
    } catch (error) {
      throw new RpcException(handleErrorMessage(error));
    }
  }
}
