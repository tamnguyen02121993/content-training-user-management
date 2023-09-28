import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {
  Menu,
  Permission,
  PermissionAssignLog,
  PermissionGroups,
  Role,
  RolePermissions,
  User,
  UserRoles,
} from './entities';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { MAIL_CLIENT_OPTIONS } from './options';

@Module({
  imports: [
    ClientsModule.registerAsync(MAIL_CLIENT_OPTIONS),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST') || 'localhost',
          port: configService.get<number>('DATABASE_PORT') || 5432,
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          // autoLoadEntities: true,
          entities: [
            User,
            UserRoles,
            Role,
            RolePermissions,
            Permission,
            PermissionGroups,
            PermissionAssignLog,
            Menu,
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
