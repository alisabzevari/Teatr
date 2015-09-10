import {Aurelia} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  aurelia.globalResources("materialize");
  aurelia.globalResources("mat-chk");
}

// Couldn't use typescript typing because it was different with js library
