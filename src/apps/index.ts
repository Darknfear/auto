import { MailModule } from '@libs/mailer/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

export const Apps = [AuthModule, UserModule, MailModule];
