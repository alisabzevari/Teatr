import fs = require("fs");

export class SettingsProvider {
  movieFolders: { path: string; active: boolean }[];
  private static fileName = "./settings.json";

  constructor(fileName?: string) {
    let fname = fileName;
    if (!fname)
      fname = SettingsProvider.fileName;
    var f = JSON.parse(fs.readFileSync(fname).toString());
    this.movieFolders = f.movieFolders;
  }
}
