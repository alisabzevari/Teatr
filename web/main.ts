import {Aurelia} from "aurelia-framework";
import "app";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature("resources", {});
  aurelia.start().then(a => a.setRoot());
}
