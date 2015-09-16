import {HttpClient} from "aurelia-http-client";
import {autoinject} from "aurelia-framework";
import {Movie} from "../model/Movie";
import {FilterObject} from "../model/FilterObject";
import * as _ from "lodash";

@autoinject()
export class Home {
  public movies: Movie[];
  public filteredMovies: Movie[];
  public filterObj: FilterObject = {};

  constructor(private http: HttpClient) {
    this.http.get("/api/movie")
      .then(response => {
      this.filteredMovies = this.movies = response.content;
      this.createFilterMaterials();
    });
  }

  public createFilterMaterials() {
    this.filterObj.genres = [];
    var genreNames = _(this.movies)
      .map(movie => movie.genre)
      .flatten()
      .uniq()
      .value();
    _.forEach(genreNames, g => {
      this.filterObj.genres.push({ name: g, selected: true });
    });
  }

  public change() {
    var selectedGenres = _(this.filterObj.genres).filter(fg => fg.selected).map(fg => fg.name).value();
    this.filteredMovies = _.filter(this.movies, movie => _.any(movie.genre, g => _.contains(selectedGenres, g)));
  }
}
