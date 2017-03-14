import {} from "node";
import { IConfiguration } from "./config";

export class BaseConfiguration implements IConfiguration {

  //sendgrid
  public sendGrid: {
    key: string
  };

  /**
   * Constructor
   *
   * @class BaseConfiguration
   * @constructor
   */
  constructor() {
    this.sendGrid = {
      key: "YOUR_KEY_GOES_HERE"
    };
  }

  /**
   * Returns true if this configuraiton is for production use.
   *
   * @class BaseConfiguration
   * @method isProduction()
   * @return boolean
   */
  public isProduction(): boolean {
    return true;
  }

  /**
   * Returns true if this configuraiton is for test use.
   *
   * @class BaseConfiguration
   * @method isTest()
   * @return boolean
   */
  public isTest(): boolean {
    return false;
  }

  /**
   * Returns the string representation of this object.
   *
   * @class BaseConfiguration
   * @method toString()
   * @return string
   */
  toString(): string {
    return "production";
  }
};