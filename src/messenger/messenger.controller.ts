import { Controller, Get, Query, Response, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Controller('webhook')
export class MessengerController {
  constructor(private config: ConfigService, private logger: Logger) {}

  @Get()
  verify(@Query() query: any, @Response() res): any {
    const VERIFY_TOKEN = this.config.messenger.verificationToken;
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        this.logger.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }
  }
}
