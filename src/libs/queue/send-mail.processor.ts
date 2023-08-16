import { EmailType, QueueType } from '@constants/enum';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TEmailCancelSubscription } from './dtos/email-cancel-subscription';
import { Logger } from '@nestjs/common';
import QueueConfig from '@configs/queue.config';

@Processor(QueueConfig.sendMailProcessor)
export class SendMailProcessor {
  constructor(private readonly sendMailService: any) {}

  @Process(QueueType.SEND_MAIL_CANCEL_SUBSCRIPTION)
  async sendMailCancelSubscriptionProcess(job: Job) {
    const emailData = job.data as TEmailCancelSubscription[];
    for await (const item of emailData) {
      const templateFile = this._getEmailCancelSubscriptionTemplate(item.type);
      if (templateFile) {
        const resultSendMail =
          await this.sendMailService.sendEmailCancelSubscription({
            ...item,
            templateFile,
          });
        Logger.log(
          `🚀 ~ Send email cancel subscription for email = ${
            item.email
          } and resultSendEmail = ${JSON.stringify(resultSendMail)}`,
        );
      }
    }
  }

  private _getEmailCancelSubscriptionTemplate(type: EmailType) {
    const templateObj = {
      [EmailType.CANCEL_SUBSCRIPTION_EMAIL_TO_CLIENT]: 'send-email-to-client',
      [EmailType.CANCEL_SUBSCRIPTION_EMAIL_TO_CLINIC_OWNER]:
        'send-email-to-clinic-owner',
      [EmailType.CANCEL_SUBSCRIPTION_EMAIL_TO_PRACTITIONER]:
        'send-email-to-practitioner',
      [EmailType.CANCEL_SUBSCRIPTION_EMAIL_TO_SOLO_PRACTITIONER]:
        'send-email-to-solo-practitioner',
    };

    return templateObj[type];
  }
}
