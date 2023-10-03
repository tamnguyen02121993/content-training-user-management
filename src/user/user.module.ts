import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role, User, UserRoles } from '../entities';
import { AuthModule } from '../auth/auth.module';
import { MAIL_CLIENT_OPTIONS } from '../options';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles, Role]),
    AuthModule,
    ClientsModule.registerAsync(MAIL_CLIENT_OPTIONS),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
