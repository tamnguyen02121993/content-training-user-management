import { Controller, UseFilters } from '@nestjs/common';
import { ExceptionFilter, PATTERN_NAMES, TableParamsDto } from '../common';
import { RoleService } from './role.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleDto, UpdateRoleDto } from './dtos';

@UseFilters(new ExceptionFilter())
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(PATTERN_NAMES.CREATE_ROLE)
  async createRole(@Payload() createRoleDto: CreateRoleDto) {
    const result = await this.roleService.createRole(createRoleDto);
    return result;
  }

  @MessagePattern(PATTERN_NAMES.UPDATE_ROLE)
  updateRole(
    @Payload('id') id: string,
    @Payload('data') updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @MessagePattern(PATTERN_NAMES.DELETE_ROLE)
  deleteRole(@Payload() userId: string) {
    return this.roleService.deleteRole(userId);
  }

  @MessagePattern(PATTERN_NAMES.GET_ROLE_BY_ID)
  getRoleById(@Payload() id: string) {
    return this.roleService.getRoleById(id);
  }

  @MessagePattern(PATTERN_NAMES.GET_ROLES)
  getRoles(@Payload() tableParamsDto: TableParamsDto) {
    return this.roleService.getRoles(tableParamsDto);
  }
}
