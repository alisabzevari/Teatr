import fs = require("fs");

export class SettingsProvider {
  movieFolders: { path: string; active: boolean }[];
  private static fileName = "./settings.json";
  private settingsFileName: string;

  constructor(fileName?: string) {
    this.settingsFileName = fileName;
    if (!this.settingsFileName)
      this.settingsFileName = SettingsProvider.fileName;
    var f = JSON.parse(fs.readFileSync(this.settingsFileName).toString());
    this.movieFolders = f.movieFolders;
  }

  saveChanges(): Promise<void> {
    var promise = new Promise<void>((resolve, reject) => {
      let settingsObj = {
        movieFolders: this.movieFolders
      };
      fs.writeFile(this.settingsFileName, JSON.stringify(settingsObj, null, 3), (err) => {
        if (err)
          reject(err);
        else
          resolve();
      });
    });
    return promise;
  }
}
