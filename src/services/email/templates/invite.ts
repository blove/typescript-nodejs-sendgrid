//import the base email class
import { EmailTemplate } from "./template";

/**
 * Invite email template.
 * @class SendInviteEmailTemplate
 */
export class SendInviteEmailTemplate extends EmailTemplate {

  //the first name of the person being invited
  public firstName: string = "";

  //the name of the group
  public groupName: string = "";

  //the full name of the inviter
  public inviter: string = "";

  /**
   * Returns the email subject.
   * @method get subject
   * @return {string}
   */
  public get subject(): string {
    return `${this.inviter} has invited you to John 1:1 - a social app for Christians in small groups`;
  }

  /**
   * Returns the file name in the DIST_PATH directory for this template.
   * @method get fileName
   * @return {string}
   */
  public get fileName(): string {
    return "invite.html";
  }

  /**
   * Post-content hook.
   * @method post
   */
  public post() {
    //do nothing
  }

  /**
   * Pre-content hook.
   * @method pre
   */
  public pre() {
    //add custom substitutions
    this.email.addSubstitution("-firstName-", this.firstName);
    this.email.addSubstitution("-groupName-", this.groupName);
    this.email.addSubstitution("-inviter-", this.inviter);
  }
}