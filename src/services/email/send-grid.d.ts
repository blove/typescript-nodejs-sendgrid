/**
 * The SendGrid Attachment class interface (duplicated from definition file)
 * @interface SendGridAttachment
 */
export interface SendGridAttachment {
  getContent(): string;
  setContent(content: string): void;

  getType(): string;
  setType(type: string): void;

  getFilename(): string;
  setFilename(filename: string): void;

  getDisposition(): string;
  setDisposition(disposition: string): void;

  getContentId(): string;
  setContentId(contentId: string): void;

  toJSON(): {
    content: string;
    type: string;
    filename: string;
    disposition: string;
    content_id: string;
  };
}

/**
 * The SendGrid Bcc class interface (duplicated from definition file)
 * @interface SendGridBcc
 */
export interface SendGridBcc {
  getEnable(): boolean;
  setEnable(enabled: boolean): void;

  getEmail(): SendGridEmail;
  setEmail(value: SendGridEmail): void;

  toJSON(): {
    enable: boolean;
    email: any;
  };
}

/**
 * The SendGrid BypassListManagement class interface (duplicated from definition file)
 * @interface SendGridBypassListManagement
 */
export interface SendGridBypassListManagement {
  getEnable(): boolean;
  setEnable(enabled: boolean): void;

  toJSON(): {
    enable: boolean;
  };
}

/**
 * The SendGrid Footer class interface (duplicated from definition file)
 * @interface SendGridFooter
 */
export interface SendGridFooter {
  getEnable(): boolean;
  setEnable(enabled: boolean): void;

  getText(): string;
  setText(text: string): void;

  getHtml(): string;
  setHtml(html: string): void;

  toJSON(): {
    enable: boolean;
    text: string;
    html: string;
  };
}

/**
 * The SendGrid Content class interface (duplicated from definition file)
 * @interface SendGridContent
 */
export interface SendGridContent {
  type: string;
  value: string;
}

/**
 * The SendGrid CustomArgs class interface (duplicated from definition file)
 * @interface SendGridCustomArgs
 */
export interface SendGridCustomArgs {
  key: string;
  value: string;
}

/**
 * The SendGrid Header class interface (duplicated from definition file)
 * @interface SendGridHeader
 */
export interface SendGridHeader {
  key: string;
  value: string;
}

/**
 * The SendGrid Mail class interface (duplicated from definition file)
 * @interface SendGridMail
 */
export interface SendGridMail {
  getFrom(): SendGridEmail;
  setFrom(email: SendGridEmail): void;

  addPersonalization(personalization: SendGridPersonalization): void;
  getPersonalizations(): SendGridPersonalization[];

  setSubject(subject: string): void;
  getSubject(): string;

  addContent(content: SendGridContent): void;
  getContents(): SendGridContent[];

  addAttachment(attachment: SendGridAttachment): void;
  getAttachments(): SendGridAttachment[];

  setTemplateId(templateId: string): void;
  getTemplateId(): string;

  setSendAt(sendAt: number): void;
  getSendAt(): number;

  addMailSettings(settings: SendGridMailSettings): void;
  getMailSettings(): SendGridMailSettings;

  setReplyTo(email: SendGridEmail): void;
  getReplyTo(): SendGridEmail;

  toJSON(): {
    from: any;
    personalizations: any[];
    subject: string;
    content: string;
    attachments: any[];
    template_id: string;
    sections: any[];
    headers: any[];
    categories: any[];
    custom_args: any[];
    send_at: number;
    batch_id: number;
    asm: any;
    ip_pool_name: string;
    mail_settings: any;
    tracking_settings: any;
    reply_to: any;
  };
}

/**
 * The SendGrid MailSettings class interface (duplicated from definition file)
 * @interface SendGridMailSettings
 */
export interface SendGridMailSettings {
  getBcc(): SendGridBcc;
  setBcc(bcc: SendGridBcc): void;

  getBypassListManagement(): SendGridBypassListManagement;
  setBypassListManagement(bypassListManagement: SendGridBypassListManagement): void;

  getFooter(): SendGridFooter;
  setFooter(footer: SendGridFooter): void;

  getSandBoxMode(): SendGridSandBoxMode;
  setSandBoxMode(sandBoxMode: SendGridSandBoxMode): void;

  getSpamCheck(): SendGridSpamCheck;
  setSpamCheck(spamCheck: SendGridSpamCheck): void;

  toJSON(): {
    bcc: any;
    bypass_list_management: any;
    footer: any;
    sandbox_mode: any;
    spam_check: any;
  };
}

/**
 * The SendGrid Personalization class interface (duplicated from definition file)
 * @interface SendGridPersonalization
 */
export interface SendGridPersonalization {
  addTo(email: SendGridEmail): void;
  getTos(): SendGridEmail[];

  addCc(email: SendGridEmail): void;
  getCcs(): SendGridEmail[];

  addBcc(email: SendGridEmail): void;
  getBccs(): SendGridEmail[];

  getSubject(): string;
  setSubject(subject: string): void;

  addHeader(header: SendGridHeader): void;
  getHeaders(): SendGridHeader[];

  addSubstitution(substitution: SendGridSubstitution): void;
  getSubstitutions(): SendGridSubstitution[]; //this appears to actually be a simple object with key/value pairs and not an array

  addCustomArg(substitution: SendGridCustomArgs): void;
  getCustomArgs(): SendGridCustomArgs[];

  setSendAt(sendAt: number): void;
  getSendAt(): number;

  toJSON(): {
    to: any;
    cc: any;
    bcc: any;
    subject: string;
    headers: any;
    substitutions: any;
    custom_args: any;
    send_at: number;
  };
}

/**
 * The SendGrid SandboxMode class interface (duplicated from definition file)
 * @interface SendGridSandBoxMode
 */
export interface SendGridSandBoxMode {
  constructor(enable: boolean);

  getEnable(): boolean;
  setEnable(enabled: boolean): void;

  toJSON(): {
    enable: boolean;
  };
}

/**
 * The SendGrid SpamCheck class interface (duplicated from definition file)
 * @interface SendGridSpamCheck
 */
export interface SendGridSpamCheck {
  getEnable(): boolean;
  setEnable(enabled: boolean): void;

  getThreshold(): number;
  setThreshold(threshold: number): void;

  //getPosttoUrl(): string;
  //setPosttoUrl(post_to_url: string): void;

  toJSON(): {
    enable: boolean;
    threshold: number;
    post_to_url: string;
  };
}

/**
 * The SendGrid Substitution class interface (duplicated from definition file)
 * @interface SendGridSubstitution
 */
export interface SendGridSubstitution {
  key?: string;
  value?: string;
}

/**
 * The SendGrid Response class interface (duplicated from definition file)
 * @interface SendGridResponse
 */
export interface SendGridResponse {
  statusCode: number;
  body: string;
  headers: string;
}

/**
 * The email interface.
 * @interface SendGridEmail
 */
export interface SendGridEmail {
  email?: string;
  name?: string;
}