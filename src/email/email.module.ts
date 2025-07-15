import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          // service: 'gmail',
          // host: "smtp.gmail.com",
          port: 465,
          // port: 587,
          // secure: false,
          secure: true,
          debug: true,
          logger: true,
          auth: {
            user: config.get('USER_GMAIL'),
            pass: config.get('USER_PASSWORD'),
          },
        },
        defaults: {
          from: config.get<string>('USER_GMAIL'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
