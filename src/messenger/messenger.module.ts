import { Module } from '@nestjs/common';
import { MessengerController } from './messenger.controller';

@Module({
  imports: [],
  controllers: [MessengerController],
})
export class MessengerModule {}
