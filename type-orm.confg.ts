import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
// import { config } from 'dotenv';
import {
  Menu,
  Permission,
  PermissionAssignLog,
  PermissionGroups,
  Role,
  RolePermissions,
  User,
  UserRoles,
} from './src/entities';

const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST') || 'localhost',
  port: configService.get<number>('DATABASE_PORT') || 5432,
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [
    Menu,
    Permission,
    PermissionAssignLog,
    PermissionGroups,
    Role,
    RolePermissions,
    User,
    UserRoles,
  ],
});
