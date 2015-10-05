import {autoinject} from "aurelia-framework";
import {Movie} from "../model/Movie";
import fs = require("fs");
import path = require("path");
import {SettingsProvider} from "./SettingsProvider";

@autoinject()
export class Movies {
  constructor(private settingsProvider: SettingsProvider) { }

  public getAll(): Promise<Movie[]> {
    let result = [];
    this.settingsProvider.movieFolders.forEach(mf => {
      if (mf.active) {
        let paths = fs.readdirSync(mf.path).map(p => path.join(mf.path, p));
        paths.forEach(p => {
          if (fs.lstatSync(p).isDirectory()) {
            var movie = this.getMovieInfo(p);
            if (movie)
              result.push();
             else
             {
               
             }
          }
        });
      }
    });
    return Promise.resolve(result);
  }

  private getMovieInfo(address: string): Movie {
    var fileName = path.join(address, "MovieInfo.json");
    if (fs.existsSync(fileName))
      return JSON.parse(fs.readFileSync(fileName).toString());
    else
      return null;
  }
}
