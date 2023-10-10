import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionService } from './permission.service';
import { ExceptionFilter, PATTERN_NAMES, TableParamsDto } from '../common';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos';

@UseFilters(new ExceptionFilter())
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @MessagePattern(PATTERN_NAMES.CREATE_PERMISSION)
  async createPermission(@Payload() createPermissionDto: CreatePermissionDto) {
    const result =
      await this.permissionService.createPermission(createPermissionDto);
    return result;
  }

  @MessagePattern(PATTERN_NAMES.UPDATE_PERMISSION)
  updatePermission(
    @Payload('id') id: string,
    @Payload('data') updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.updatePermission(id, updatePermissionDto);
  }

  @MessagePattern(PATTERN_NAMES.DELETE_PERMISSION)
  deletePermission(@Payload() userId: string) {
    return this.permissionService.deletePermission(userId);
  }

  @MessagePattern(PATTERN_NAMES.GET_PERMISSION_BY_ID)
  getPermissionById(@Payload() id: string) {
    return this.permissionService.getPermissionById(id);
  }

  @MessagePattern(PATTERN_NAMES.GET_PERMISSIONS)
  getPermissions(@Payload() tableParamsDto: TableParamsDto) {
    return this.permissionService.getPermissions(tableParamsDto);
  }
}
