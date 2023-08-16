import { EmailType } from '@constants/enum';

export type TEmailCancelSubscription = {
  type: EmailType;
  email: string;
  [key: string]: string;
};
