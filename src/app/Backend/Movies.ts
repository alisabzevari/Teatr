import {autoinject} from "aurelia-framework";
import {Movie} from "../model/Movie";
import fs = require("fs");
import path = require("path");
import {SettingsProvider} from "./SettingsProvider";
import {MovieDiscovery} from "./MovieDiscovery";

@autoinject()
export class Movies {
  constructor(private settingsProvider: SettingsProvider) { }

  public getAll(): Promise<Movie[]> {
    let promises = [];
    let movieDiscovery = new MovieDiscovery();
    this.settingsProvider.movieFolders
      .filter(mf => mf.active)
      .reduce((prev, mf) => prev.concat(fs.readdirSync(mf.path).map(p => path.join(mf.path, p)).filter(path => fs.lstatSync(path).isDirectory())), [])
      .forEach(folder => {
        let promise = new Promise((resolve, reject) => {
          let movieInfo = this.getMovieInfo(folder);
          if (movieInfo)
            resolve(movieInfo);
          else { 
            return movieDiscovery.discoverMovie(path.dirname(folder));
          }
        });
        promises.push(promise);
      });
    return Promise.all(promises);
  }

  private getMovieInfo(address: string): Movie {
    var fileName = path.join(address, "MovieInfo.json");
    if (fs.existsSync(fileName))
      return JSON.parse(fs.readFileSync(fileName).toString());
    else
      return null;
  }
}
