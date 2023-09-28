import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { MODULE_NAMES } from 'src/common';

export const MAIL_CLIENT_OPTIONS: ClientsModuleAsyncOptions = {
  clients: [
    {
      name: MODULE_NAMES.MAIL_CLIENT_MICROSERVICE,
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'mail-content-training',
              brokers: [`localhost:${configService.get<number>('KAFKA_PORT')}`],
            },
            consumer: {
              groupId: 'mail-content-training-consumer',
            },
          },
        };
      },
      inject: [ConfigService],
    },
  ],
};
