// import {loadNodeModule} from "./ModuleLoader";
// var fs = loadNodeModule("fs");
import fs = require("fs");

export class SettingsProvider {
  movieFolders: { path: string; active: boolean }[];
  private static fileName = "./settings.json";

  constructor() {
    var f = JSON.parse(fs.readFileSync(SettingsProvider.fileName).toString());
    this.movieFolders = f.movieFolders;
  }
}
