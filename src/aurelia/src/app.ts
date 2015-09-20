import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class App {
  constructor(private router: Router) {
    this.router.configure(config => {
      config.title = "Teatr";
      config.map([
        { route: ["", "home"], name: "home", moduleId: "views/home", nav: true, title: "Home" },
        { route: "settings", name: "settings", moduleId: "views/settings", nav: true, title: "Settings" }
      ]);
      return config;
    });
  }
}
