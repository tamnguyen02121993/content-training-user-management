import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { User } from '../entities';
import { AuthService } from './auth.service';
import { MAIL_CLIENT_OPTIONS } from '../options';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET_KEY');
        return {
          secret,
          signOptions: {
            expiresIn: '3600s',
            issuer: 'Content Training Api',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.registerAsync(MAIL_CLIENT_OPTIONS),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
