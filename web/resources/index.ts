import {FrameworkConfiguration} from "aurelia-framework";
// import "./materialize";
// import "./mat-chk";

export function configure(config: FrameworkConfiguration) {
    config.globalResources(["./materialize", "./mat-chk"]);
}

// Couldn't use typescript typing because it was different with js library
