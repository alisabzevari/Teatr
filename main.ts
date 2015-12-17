import "materialize";
import {Aurelia} from "aurelia-framework";
import {bootstrap} from "aurelia-bootstrapper";

bootstrap((aurelia: Aurelia) => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature("resources", {});
  aurelia.start().then(a => a.setRoot("app", document.querySelector("body")));
});