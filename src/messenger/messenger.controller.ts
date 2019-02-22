import { Controller, Get, Query, Response, Post, Body } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import axios from 'axios';

@Controller('webhook')
export class MessengerController {
  constructor(private config: ConfigService) {}

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
        // console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }
  }

  @Post()
  process(@Body() body, @Response() res) {
    if (body.object === 'page') {
      body.entry.forEach(entry => {
        // Gets the body of the webhook event
        const event = entry.messaging[0];
        console.log(event);

        // Get the sender PSID
        const senderPsid = event.sender.id;
        console.log('Sender PSID: ' + senderPsid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (event.message) {
          sendResponse(
            senderPsid,
            buildMessageResponse(event.message),
            this.config.messenger.apiKey,
          )
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        } else if (event.postback) {
          // yap =) probamos? oki deploy no
          // handlePostback(sender_psid, webhook_event.postback);
        }
      });
      res.sendStatus(200);
    }
  }
}

function buildMessageResponse(receivedMessage) {
  let response;

  // Check if the message contains text
  if (receivedMessage.text) {
    // Create the payload for a basic text message
    response = {
      text: `You sent the message: "${
        receivedMessage.text
      }". Now send me an image!`,
    };
  }
  return response;
}

function sendResponse(senderPsid: string, response: string, token: string) {
  return axios.post(
    'https://graph.facebook.com/v3.2/me/messages',
    {
      recipient: {
        id: senderPsid,
      },
      message: response,
    },
    {
      params: { access_token: token },
    },
  );
}

// sino has heroku container:push web -a=quekiwi-messenger
