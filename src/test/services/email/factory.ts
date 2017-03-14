import { suite, test } from "mocha-typescript";
import "mocha";

//use q promises
const Q = require("q");
global.Promise = Q.Promise;

//require chai and use should assertions
let chai = require("chai");
chai.should();

//import email
import { EmailTemplateFactory } from "../../../services/email/factory";
import { EmailTemplate } from "../../../services/email/templates/template";
import { SendInviteEmailTemplate } from "../../../services/email/templates/invite";

@suite
class EmailTemplateFactoryTest {

  //template factory
  private factory: EmailTemplateFactory;

  public before() {
    this.factory = new EmailTemplateFactory();
  }

  @test("should create")
  public create() {
    this.factory.should.be.an.instanceOf(EmailTemplateFactory);
  }

  @test("should create an invite template")
  public invite() {
    let template = EmailTemplateFactory.invite;
    template.should.be.an.instanceOf(SendInviteEmailTemplate);
  }
}