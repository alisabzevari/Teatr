import {Aurelia} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature("resources", {});
  console.log("main");
  aurelia.start().then(a => a.setRoot());
}
