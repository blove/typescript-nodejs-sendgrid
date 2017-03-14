import { suite, test } from "mocha-typescript";
import "mocha";

//use q promises
const Q = require("q");
global.Promise = Q.Promise;

//require chai and use should assertions
let chai = require("chai");
chai.should();

//import email
import { Email } from "../../../services/email/facades/email";
import { EmailService } from "../../../services/email/email-service";

//import sendgrid
import { SendGridContent } from "../../../services/email/send-grid";

@suite
class EmailServiceTest {

  //email
  private emailService: EmailService;

  public before() {
    this.emailService = new EmailService();
  }

  @test("should create")
  public create() {
    this.emailService.should.be.an.instanceof(EmailService);
    this.emailService.email.should.be.an.instanceOf(Email);
  }

  @test("should have a subject")
  public subject() {
    const SUBJECT: string = "This is just a test";

    //set subject
    this.emailService.subject = SUBJECT;

    //test subject
    this.emailService.subject.should.be.a("string").that.eqls(SUBJECT);
  }

  @test("should have a from email and name")
  public from() {
    const EMAIL: string = "test@testing.com";
    const NAME: string = "Tester";

    //add from
    this.emailService.setFromString(EMAIL, NAME);

    //test from
    this.emailService.email.from.email.should.be.a("string").that.eqls(EMAIL);
    this.emailService.email.from.name.should.be.a("string").that.eqls(NAME);
  }

  @test("should add a to email and name")
  public to() {
    const EMAIL: string = "test@testing.com";
    const NAME: string = "Tester";

    //add to
    this.emailService.addTo(EMAIL, NAME);

    //test tos
    let tos = this.emailService.email.personalization.getTos();
    tos.should.be.an("array").with.lengthOf(1);

    //test to
    let to = tos[0];
    to.email.should.be.a("string").that.eqls(EMAIL);
    to.name.should.be.a("string").that.eqls(NAME);
  }

  @test("should add content")
  public addContent() {
    const CONTENT: SendGridContent = {
      type: "text/html",
      value: "<p>This is just a test.</p>"
    };

    //add content
    this.emailService.addContent(CONTENT);

    //test content
    this.emailService.email.contents.should.be.an("array").with.length.at.least(1);
  }

  @test("should add content by string")
  public addContentString() {
    const VALUE: string = "<p>This is just a test.</p>";

    //add content
    this.emailService.addContentString(VALUE);

    //test content
    this.emailService.email.contents.should.be.an("array").with.length.at.least(1);
  }

  /*@test("should send an email")
  public send() {
    const EMAIL: string = "blove@johnoneone.com";
    const NAME: string = "Brian Love";


    this.emailService.addTo(EMAIL, NAME);
    this.emailService.subject = "Email Test";
    this.emailService.addContentString("<p><strong>Woot</strong> woot!</p>");
    return this.emailService.send();
  }*/

}