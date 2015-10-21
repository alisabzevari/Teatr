import {SettingsProvider} from "../../Core/SettingsProvider";
import {autoinject} from "aurelia-framework";

@autoinject()
export class Settings {
  constructor(public settings: SettingsProvider) {
    
  }
}
