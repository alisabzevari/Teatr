import fs = require("fs");

export class SettingsProvider {
  movieFolders: { path: string; active: boolean }[];
  private static fileName = "/settings.json";

  constructor() {
    var f = fs.readFileSync(SettingsProvider.fileName).toJSON();
    this.movieFolders = f.movieFolders;
  }
}
