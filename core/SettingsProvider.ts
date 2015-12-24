export class SettingsProvider {
    movieFolders: { entry: Entry; active: boolean }[];
    constructor() {
    }

    load(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            chrome.storage.local.get("settings", result => {
                if (result["settings"]) {
                    this.movieFolders = result["settings"].movieFolders
                }
                resolve();
            });
        });
    }

    saveChanges(): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            let settingsObj = {
                movieFolders: this.movieFolders
            };
            chrome.storage.local.set("settings", () => resolve());
        });
        return promise;
    }
}

// import fs = require("fs");
//     
//     export class SettingsProvider {
// 
//     
//     movieFolders: { path: string; active: boolean }[];
//   private static fileName = "./settings.json";
//     private settingsFileName: string;
//         
//         consructor(fileName?: string) {
//         this.settingsFileName = fileName;
//         if (!this.settingsFileName)
//           this.settingsFileName = SettingsProvider.fileName;
//       var f = JSON.parse(fs.readFileSync(this.settingsFileName).toString());
//     this.movieFolders = f.movieFolders;
//     }
//         
//             saveChanges(): Promise<void> {
//                 var promise = new Promise<void>((resolve, reject) => {
//             let settingsObj = {
//               movieFolders: this.movieFolders
//             };
//                 fs.writeFile(this.settingsFileName, JSON.stringify(settingsObj, null, 3), (err) => {
//             if (err)
//                 reject(err);
//           else
//           resolve();
//       });
//     });
//     return promise;
//   }
// }
