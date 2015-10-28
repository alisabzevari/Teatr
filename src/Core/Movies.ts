import {autoinject} from "aurelia-framework";
import {Movie} from "../Core/Movie";
import fs = require("fs");
import path = require("path");
import {SettingsProvider} from "./SettingsProvider";
import {MovieDiscovery} from "./MovieDiscovery";
import {shell} from "./Electron";
import * as _ from "lodash";

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
          resolve(movieInfo);
        });
        promises.push(promise);
      });
    return Promise.all(promises).then(result => result.filter(r => r));
  }

  public openInImdb(movie: Movie) {
    shell.openExternal(`http://www.imdb.com/title/${movie.imdbID}`);
  }

  public explore(movie: Movie) {
    shell.showItemInFolder(movie.folderAddress);
  }

  public openSubtitles(movie: Movie) {
    shell.openExternal(`http://subscene.com/subtitles/title?q=${movie.title}`);
  }

  private getMovieInfo(address: string): Movie {
    var fileName = path.join(address, "MovieInfo.json");
    if (fs.existsSync(fileName))
      return <Movie>_.extend(JSON.parse(fs.readFileSync(fileName).toString()), {folderAddress: address});
    else
      return null;
  }
}
