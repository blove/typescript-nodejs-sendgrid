//import parent Email class
import { Email } from "./email";
import { ProductionEmail } from "./production-email";

//import sendgrid
import * as SendGrid from "sendgrid";
import {
  SendGridMail,
  SendGridResponse
} from "../send-grid";

/**
 * An email when testing the application.
 * @class TestEmail
 */
export class TestEmail extends ProductionEmail {

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Pre-send hook.
   * @method pre
   */
  public pre() {
    super.pre();

    //get MailSettings
    var mailSettings;
    if (this.mail.getMailSettings() === undefined) {
      mailSettings = new SendGrid.mail.MailSettings();
    } else {
      mailSettings = this.mail.getMailSettings();
    }

    //set SandBoxMode
    var sandBoxMode;
    if (mailSettings.getSandBoxMode() === undefined) {
      sandBoxMode = new SendGrid.mail.SandBoxMode((this.configuration.isTest()));
      mailSettings.setSandBoxMode(sandBoxMode);
    } else {
      sandBoxMode = mailSettings.getSandBoxMode();
      sandBoxMode.setEnabled((this.configuration.isTest()));
    }
  }

  /**
   * Send the email
   * @method send
   */
  public send(): Promise<SendGridResponse> {
    //delete mail if it already exists
    if (this._mail !== undefined) {
      delete this._mail;
    }

    //build a new Mail helper object
    let from = new SendGrid.mail.Email(Email.FROM_EMAIL, Email.FROM_NAME);
    let to = new SendGrid.mail.Email(Email.TO_EMAIL, Email.TO_NAME);
    let content;
    if (this.contents.length === 0) {
      content = new SendGrid.mail.Content("text/html", "");
    } else {
      content = this.contents[0];
    }
    this._mail = new SendGrid.mail.Mail(from, this.subject, to, content);

    //send email
    return super.send();
  }
}