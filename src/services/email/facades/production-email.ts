//import parent Email class
import { Email } from "./email";

//import sendgrid
import * as SendGrid from "sendgrid";
import {
  SendGridMail,
  SendGridResponse
} from "../send-grid";

/**
 * An email when application is in production.
 * @class ProductionEmail
 */
export class ProductionEmail extends Email {

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Post-send hook.
   * @method postSend
   */
  public post() {
    //left blank intentionally
  }

  /**
   * Pre-send hook.
   * @method preSend
   */
  public pre() {
    //left blank intentionally
  }

  /**
   * Send the email
   * @method send
   */
  public send(): Promise<SendGridResponse> {
    //pre hook
    this.pre();

    //build request
    let request = this.sendGrid.emptyRequest({
      body: this.mail.toJSON(),
      method: "POST",
      path: "/v3/mail/send"
    });

    //send request
    return this.sendGrid.API(request).then(() => {
      //post hook
      this.post();
    });
  }
}