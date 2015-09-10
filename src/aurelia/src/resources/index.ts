import {Aurelia} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  aurelia.globalResources("materialize");
}

// Couldn't use typescript typing because it was different with js library
