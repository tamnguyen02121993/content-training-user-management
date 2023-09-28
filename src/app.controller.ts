import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { MAIL_PATTERNS, MODULE_NAMES } from './common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('apps')
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(MODULE_NAMES.MAIL_CLIENT_MICROSERVICE)
    private readonly userClient: ClientKafka,
  ) {}

  async onModuleDestroy() {
    await this.userClient.close();
  }

  async onModuleInit() {
    const mailPatterns = Object.values(MAIL_PATTERNS);
    for (const pattern of mailPatterns) {
      this.userClient.subscribeToResponseOf(pattern);
    }
    await this.userClient.connect();
  }
}
