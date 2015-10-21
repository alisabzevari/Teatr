import fs = require("fs");
import path = require("path");
import {Movie} from "./Movie";
import http = require("http");

export class MovieDiscovery {
  private _replacables = ["scoop", "webdl", "brrip", "mkv", "yify", "paroos", "blueray", "720p", "dvdrip", "fxg", "eng", "far",
    "axxo", "xvid", "divx", "nedivx", "-", "klaxxon", "zektorm", "fxm", "1080p", "dvdrip", "psig", "hdmicro", "kickass", "brrip",
    "x264", "_", "noscr", "jns", ".", "[", "]", "(", ")", "ganool", "1080", "farsi", "dubbed", "tinymovies", "amiable", "shaanig",
    "web-dl", "5.1ch", "chd3d", "x264", "dts"];

  public discoverMoviesInDirectory(dir: string) {
    let folders = fs.readdirSync(dir).map(p => path.join(dir, p));
    folders.forEach(folder => {
      let movieInfoPath = path.join(folder, "MovieInfo.json");
      if (fs.existsSync(movieInfoPath)) {
        let movieInfo = this.discoverMovie(folder);
        if (movieInfo) {
          fs.writeFileSync(movieInfoPath, JSON.stringify(movieInfo));
        }
      }
    });
  }

  public discoverMovie(query: string): Promise<Movie> {
    return this.getImDbId(this.cleanTitle(query))
      .then(id => this.getMovieDetails(id));
  }

  private cleanTitle(dirtyTitle: string): string {
    let dt = dirtyTitle.toLowerCase();
    return this._replacables.reduce((prev, curr) => prev.split(curr).join(""), dt);
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
      }).on("error", e => reject(e));
    });
  }

  private baseUrl = "http://www.omdbapi.com/?";

  public getMovieDetails(imdbId: string): Promise<Movie> {
    return new Promise((resolve, reject) => {
      http.get(this.baseUrl + "i=" + imdbId, response => {
        let body = "";
        response.on("data", d => body += d);
        response.on("end", () => resolve(JSON.parse(body)))
      }).on("error", e => reject(e));;

    });
  }

}
