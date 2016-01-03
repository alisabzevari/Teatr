import {Aurelia} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature("resources", {});
  aurelia.start().then(a => a.setRoot());
}
