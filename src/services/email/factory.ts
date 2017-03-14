//import email service
import { EmailService } from "./email-service";

//import templates
import { SendInviteEmailTemplate } from "./templates/invite";

/**
 * The email factory.
 * @class EmailFactory
 */
export class EmailTemplateFactory {

  /**
   * Returns a new EmailService instance.
   * @method get emailService
   * @return {EmailService}
   */
  public static get emailService() {
    return new EmailService();
  }

  /**
   * Send an invite email.
   * @method get sendInviteEmailTemplate
   * @return {EmailService}
   */
  public static get invite(): SendInviteEmailTemplate {
    return new SendInviteEmailTemplate();
  }

}