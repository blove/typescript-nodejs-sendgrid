//import config
import { ConfigurationFactory } from "../../../config/factory";
import { IConfiguration } from "../../../config/config";

//import sendgrid
import * as SendGrid from "sendgrid";
import {
  SendGridContent,
  SendGridEmail,
  SendGridMail,
  SendGridPersonalization,
  SendGridResponse,
  SendGridSubstitution
} from "../send-grid";

/**
 * The base class for emails.
 * @class Email
 */
export abstract class Email {

  //constants
  public static FROM_EMAIL: string = "no-reply@johnoneone.com";
  public static FROM_NAME: string = "John 1:1";
  public static TO_EMAIL: string = "blove@johnoneone.com";
  public static TO_NAME: string = "Brian Love";

  //the config
  protected configuration: IConfiguration;

  //the SendGrid API
  protected sendGrid: any;

  //the SendGrid Mail helper
  protected _mail: any;

  /**
   * @constructor
   */
  constructor() {
    //get configuration object
    this.configuration = ConfigurationFactory.config();

    //store the SendGrid API
    this.sendGrid = SendGrid(this.configuration.sendGrid.key);

    //set default from email address(es)
    this.setFromString(Email.FROM_EMAIL, Email.FROM_NAME);
  }

  /**
   * Returns the Contents array.
   * @method get contents
   * @return {SendGridContent[]}
   */
  public get contents(): SendGridContent[] {
    return this.mail.getContents();
  }

  /**
   * Returns the from Email object.
   * @return {SendGridEmail}
   */
  public get from(): SendGridEmail {
    return this.mail.getFrom();
  }

  /**
   * Set the from email and name.
   * @method set from
   * @param {SendGridEmail} from
   */
  public set from(from: SendGridEmail) {
    this.mail.setFrom(from);
  }

  /**
   * Returns the populated SendGrid.mail.Email helper object.
   * @method get mail
   * @return {SendGridMail}
   */
  public get mail(): SendGridMail {
    //return existing mail object
    if (this._mail !== undefined) {
      return this._mail;
    }

    //set mail helper
    this._mail = new SendGrid.mail.Mail();

    return this._mail;
  }

  /**
   * Returns the SendGrid Personalization object.
   * @method get personalization
   * @return {SendGridPersonalization}
   */
  public get personalization(): SendGridPersonalization {
    //verify personalization exists
    if (this.mail.getPersonalizations() === undefined || this.mail.getPersonalizations().length === 0) {
      this.mail.addPersonalization(new SendGrid.mail.Personalization());
    }

    //get first personalization by default
    let personalizations = this.mail.getPersonalizations();
    return personalizations[0];
  }

  /**
   * Returns the subject for this email.
   * @method get subject
   * @return {string}
   */
  public get subject(): string {
    return this.mail.getSubject();
  }

  /**
   * Set the subject for this email.
   * @method set subject
   * @param {string} subject
   */
  public set subject(subject: string) {
    this.mail.setSubject(subject);
  }

  /**
   * Return the substitutions.
   * @method get substitution
   * @return {SendGridSubstitution[]}
   */
  public get substitutions(): SendGridSubstitution[] {
    return this.personalization.getSubstitutions();
  }

  /**
   * Add content to this email.
   * @method addContent
   * @param {SendGridContent} content
   * @return {Email}
   */
  public addContent(content: SendGridContent): Email {
    //add content to Mail helper
    this.mail.addContent(content);

    return this;
  }

  /**
   * Add content to this email from a simple string. The default type is "text/html".
   * @method addContentString
   * @param {string} value
   * @param {string} type
   * @return {Email}
   */
  public addContentString(value: string, type: string = "text/html"): Email {
    //build content
    let content: SendGridContent = {
      type: type,
      value: value
    };

    //add content to Mail helper
    this.addContent(content);

    return this;
  }

  /**
   * Add to address using simple values.
   * @method addTo
   * @param {string} email
   * @param {string} name
   * @return {Email}
   */
  public addTo(email: string, name?: string): Email {
    //create Email
    let to = new SendGrid.mail.Email(email);
    if (name !== undefined) {
      to.name = name;
    }

    //add to Mail helper
    this.personalization.addTo(to);

    return this;
  }

  /**
   * Add a substitution in the email template.
   * @method addSubstitution
   * @param {string} key
   * @param {string} value
   * @return {Email}
   */
  public addSubstitution(key: string, value: string): Email {
    let substition = new SendGrid.mail.Substitution(key, value);
    this.personalization.addSubstitution(substition);

    return this;
  }

  /**
   * Post-send hook.
   * @method postSend
   * @abstract
   */
  abstract post();

  /**
   * Pre-send hook.
   * @method preSend
   * @abstract
   */
  abstract pre();

  /**
   * Send the email.
   * @method send
   * @abstract
   */
  abstract send(): Promise<SendGridResponse>;

  /**
   * Set from using simple values.
   * @method setFromString
   * @param {string} email
   * @param {string} name
   * @return {Email}
   */
  public setFromString(email: string, name?: string): Email {
    //create Email
    let from = new SendGrid.mail.Email(email);
    if (name !== undefined) {
      from.name = name;
    }

    //set from property
    this.from = from;

    return this;
  }
}