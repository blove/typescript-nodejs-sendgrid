import { BaseConfiguration } from "./base";

export class TestConfiguration extends BaseConfiguration {

  /**
   * Constructor
   *
   * @class TestConfiguration
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Returns true if this configuraiton is for test use.
   *
   * @interface TestConfiguration
   * @method isTest()
   * @return boolean
   */
  public isTest(): boolean {
    return true;
  }

  /**
   * Returns the string representation of this object.
   *
   * @class TestConfiguration
   * @method toString()
   * @return string
   */
  toString(): string {
    return "test";
  }
};