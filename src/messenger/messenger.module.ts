import { Module } from '@nestjs/common';
import { MessengerController } from './messenger.controller';

@Module({
  controllers: [MessengerController],
})
export class MessengerModule {}
