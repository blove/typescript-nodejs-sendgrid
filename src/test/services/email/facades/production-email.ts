import { suite, test } from "mocha-typescript";
import "mocha";

//use q promises
const Q = require("q");
global.Promise = Q.Promise;

//require chai and use should assertions
let chai = require("chai");
chai.should();

//import email
import { Email } from "../../../../services/email/facades/email";
import { ProductionEmail } from "../../../../services/email/facades/production-email";

//import sendgrid
import { SendGridContent } from "../../../../services/email/send-grid";

@suite
class ProductionEmailTest {

  //email
  private email: ProductionEmail;

  public before() {
    this.email = new ProductionEmail();
  }

  @test("should create")
  public create() {
    this.email.should.be.an.instanceof(ProductionEmail);
  }

  @test("should have a subject")
  public subject() {
    const SUBJECT: string = "This is just a test";

    //set subject
    this.email.subject = SUBJECT;

    //test subject
    this.email.subject.should.be.a("string").that.eqls(SUBJECT);
  }

  @test("should have a from email and name")
  public from() {
    let from = this.email.from;
    from.email.should.be.a("string").that.eqls(Email.FROM_EMAIL);
    from.name.should.be.a("string").that.eqls(Email.FROM_NAME);
  }

  @test("should add a to email and name")
  public to() {
    const EMAIL: string = "test@testing.com";
    const NAME: string = "Tester";

    //add to
    this.email.addTo(EMAIL, NAME);

    //test tos
    let tos = this.email.personalization.getTos();
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
    this.email.addContent(CONTENT);

    //test content
    this.email.contents.should.be.an("array").with.length.at.least(1);
  }

  @test("should add content by string")
  public addContentString() {
    const VALUE: string = "<p>This is just a test.</p>";

    //add content
    this.email.addContentString(VALUE);

    //test content
    this.email.contents.should.be.an("array").with.length.at.least(1);
  }

  @test("should add a substitution")
  public addSubstitution() {
    const KEY: string = "key";
    const VALUE: string = "value";

    //add substitution
    this.email.addSubstitution(KEY, VALUE);

    //test substitution
    let substitutions = this.email.substitutions;
    substitutions.should.be.an("object");
    substitutions.should.have.property(KEY).that.eql(VALUE);
  }

  /*@test("should send an email")
  public send() {
    this.email.addTo("blove@johnoneone.com", "Brian Love");
    this.email.subject = "Email Test";
    this.email.addContent("<p><strong>Woot</strong> woot!</p>");
    return this.email.send();
  }*/

}