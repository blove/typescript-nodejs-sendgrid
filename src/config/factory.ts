import {} from "node";
import { BaseConfiguration } from "./base";
import { IConfiguration } from "./config";
import { TestConfiguration } from "./test";

export class ConfigurationFactory {

  private static _config: IConfiguration;

  public static config(): IConfiguration {
    //return singleton instance
    if (typeof ConfigurationFactory._config !== "undefined" && ConfigurationFactory._config !== null) {
      return ConfigurationFactory._config;
    }

    //create config
     if (process.env.NODE_ENV === "test") {
      ConfigurationFactory._config = new TestConfiguration();
    } else {
      ConfigurationFactory._config = new BaseConfiguration();
    }

    return ConfigurationFactory._config;
  }

}