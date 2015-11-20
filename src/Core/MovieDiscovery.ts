import fs = require("fs");
import path = require("path");
import {Movie} from "./Movie";
import http = require("http");
import * as _ from "lodash";

export class MovieDiscovery {
  private _replacables = ["scoop", "webdl", "brrip", "mkv", "yify", "paroos", "blueray", "720p", "dvdrip", "fxg", "eng", "far",
    "axxo", "xvid", "divx", "nedivx", "-", "klaxxon", "zektorm", "fxm", "1080p", "dvdrip", "psig", "hdmicro", "kickass", "brrip",
    "x264", "_", "noscr", "jns", ".", "[", "]", "(", ")", "ganool", "1080", "farsi", "dubbed", "tinymovies", "amiable", "shaanig",
    "web-dl", "5.1ch", "chd3d", "x264", "dts"];

  // TODO: fix resolve here. the funtion does not properly resolves. It could be better to resolve with list of discovered movies 
  public discoverMoviesInDirectory(dir: string): Promise<Movie>[] {
    let folders = fs.readdirSync(dir).map(p => path.join(dir, p)).filter(p => fs.lstatSync(p).isDirectory());
    let unDiscoveredFolders = folders.filter(f => !this.hasBeenDiscovered(f));
    let promises = unDiscoveredFolders.map(f => this.discoverMovieByDirectory(f));
    return promises;
  }

  private discoverMovieByDirectory(folderName: string): Promise<Movie> {
    return this.getMovieInfo(path.basename(folderName))
      .then(movie => {
        if (movie) {
          let movieInfoFile = path.join(folderName, "MovieInfo.json");
          fs.writeFileSync(movieInfoFile, JSON.stringify(movie, null, 3));
        }
        return movie;
      });
  }

  private hasBeenDiscovered(folderName: string): boolean {
    let movieInfoFile = path.join(folderName, "MovieInfo.json");
    return fs.existsSync(movieInfoFile);
  }

  public getMovieInfo(query: string): Promise<Movie> {
    return this.getImDbId(this.cleanTitle(query))
      .then(id => {
        if (id)
          return this.getMovieInfoById(id);
        else
          return null;
      });
  }

  public getMovieInfoById(imdbId: string): Promise<Movie> {
    return new Promise((resolve, reject) => {
      http.get(`http://www.omdbapi.com/?i=${imdbId}`, response => {
        let body = "";
        response.on("data", d => body += d);
        response.on("end", () => resolve(this.prepare(JSON.parse(body))));
      }).on("error", e => {
        console.error(e);
        resolve(null);
      });
    });
  }

  private getImDbId(movieName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      http.get("http://www.google.com/search?q=imdb+" + movieName, (response) => {
        let body = "";
        response.on("data", d => body += d);
        response.on("end", () => {
          let imdbUrls = /http:\/\/www.imdb.com\/title\/tt\d{7}\//.exec(body);
          if (imdbUrls)
            resolve(imdbUrls[0].match(/tt\d{7}/)[0]);
          else
            resolve("");
        });
      }).on("error", e => {
        console.error(e);
        resolve("");
      });
    });
  }

  private cleanTitle(dirtyTitle: string): string {
    let dt = dirtyTitle.toLowerCase();
    return this._replacables.reduce((prev, curr) => prev.split(curr).join(""), dt);
  }

  private prepare(movie: any): Movie {
    return this.fixArrays(this.toCamelCase(movie));
  }

  private fixArrays(movie: any): Movie {
    let result = _.clone(movie);
    result.actors = result.actors.split(",").map(s => s.trim());
    result.genre = result.genre.split(",").map(s => s.trim());
    return result;
  }

  private toCamelCase(obj: any): any {
    let result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[this.firstToLower(key)] = obj[key];
      }
    }
    return result;
  }

  private firstToLower(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  public getDiscoveredMoviesInFolder(folderName: string): number {
    if (fs.existsSync(folderName)) {
      let folders = fs.readdirSync(folderName).map(p => path.join(folderName, p)).filter(p => fs.lstatSync(p).isDirectory());
      return folders.filter(f => this.hasBeenDiscovered(f)).length;
    }
    return null;
  }

  public getUnDiscoveredMoviesInFolder(folderName: string): number {
    if (fs.existsSync(folderName)) {
      let folders = fs.readdirSync(folderName).map(p => path.join(folderName, p)).filter(p => fs.lstatSync(p).isDirectory());
      return folders.filter(f => !this.hasBeenDiscovered(f)).length;
    }
    return null;
  }

}
