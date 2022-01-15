import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export default class EmailService {
  private mailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.mailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      }
    });
  }

  sendMail(options: Mail.Options) {
    return this.mailerTransport.sendMail(options);
  }
}