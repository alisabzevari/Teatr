import {SettingsProvider} from "../Backend/SettingsProvider";
import {autoinject} from "aurelia-framework";

@autoinject()
export class Settings {
  constructor(public settings: SettingsProvider) {
  }
}
