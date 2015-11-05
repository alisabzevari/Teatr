import {SettingsProvider} from "../../Core/SettingsProvider";
import {autoinject} from "aurelia-framework";
import {} from "materialize";

@autoinject()
export class Manage {
  constructor(public settings: SettingsProvider) {

  }

  saveChanges() {
    this.settings.saveChanges()
      .then(() => Materialize.toast("Settings Saved", 500))
      .catch(err => {
        Materialize.toast("Error in saving settings.", 500);
        throw err;
      });
  }

}
