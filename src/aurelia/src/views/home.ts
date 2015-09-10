import {HttpClient} from "aurelia-http-client";
import {autoinject} from "aurelia-framework";
import {Movie} from "../model/Movie";
import * as _ from "lodash";

@autoinject()
export class Home {
  public movies: Movie[];
  public allGenres: string[];

  constructor(private http: HttpClient) {
    this.http.get("/api/movie")
      .then(response => {
      this.movies = response.content;
      this.createFilterMaterials();
    });
  }

  public createFilterMaterials() {
    this.allGenres = _(this.movies)
      .map(movie => movie.genre)
      .flatten()
      .uniq()
      .value();
  }
}
