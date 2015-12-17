import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";

@autoinject()
export class App {
  constructor(private router: Router) {
    this.router.configure(config => {
      config.title = "Teatr";
      config.map([
        { route: ["", "home"], name: "home", moduleId: "views/home", nav: true, title: "Home" },
        { route: "manage", name: "manage", moduleId: "views/manage", nav: true, title: "Manage" }
      ]);
      return config;
    });
  }
}
