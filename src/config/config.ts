export interface IConfiguration {

  //SendGrid
  sendGrid: {
    key: string
  };

  /**
   * Returns true if this configuraiton is for production use.
   *
   * @class IConfiguration
   * @method isProduction()
   * @return boolean
   */
  isProduction(): boolean;

  /**
   * Returns true if this configuraiton is for test use.
   *
   * @class IConfiguration
   * @method isTest()
   * @return boolean
   */
  isTest(): boolean;

  /**
   * Returns the string representation of this object.
   *
   * @interface IConfiguration
   * @method toString()
   * @return string
   */
  toString(): string;
};