import {autoinject} from "aurelia-framework";
import {Movie} from "./Movie";
import * as fs from "fs";
import * as path from "path";
import {SettingsProvider} from "./SettingsProvider";
import {MovieDiscovery} from "./MovieDiscovery";
import {shell} from "./Electron";
import * as _ from "underscore";

@autoinject()
export class Movies {
  constructor(private settingsProvider: SettingsProvider) { }

  public getAll(): Promise<Movie[]> {
    let promises = [];
    let movieDiscovery = new MovieDiscovery();
    this.settingsProvider.movieFolders
      .filter(mf => mf.active && fs.existsSync(mf.path))
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


  public explore(movie: Movie) {
    shell.showItemInFolder(movie.folderAddress);
  }

  public openInImdb(movie: Movie) {
    shell.openExternal(`http://www.imdb.com/title/${movie.imdbID}`);
  }

  public openSubtitles(movie: Movie) {
    shell.openExternal(`http://subscene.com/subtitles/title?q=${movie.title}`);
  }
  
  public googleSearch(query: string){
    shell.openExternal(`http://www.google.com/search?q=${query}`);
  }

  private getMovieInfo(address: string): Movie {
    var fileName = path.join(address, "MovieInfo.json");
    if (fs.existsSync(fileName))
      return <Movie>_.extend(JSON.parse(fs.readFileSync(fileName).toString()), {folderAddress: address});
    else
      return null;
  }
}
