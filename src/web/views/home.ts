import {autoinject} from "aurelia-framework";
import {Movie} from "../../Core/Movie";
import {FilterObject} from "../model/FilterObject";
import {Movies} from "../../Core/Movies";
import * as _ from "lodash";

@autoinject()
export class Home {
  public movies: Movie[];
  public filteredMovies: Movie[];
  public filterObj: FilterObject = {};

  constructor(private moviesManager: Movies) {
    this.moviesManager.getAll()
      .then(movies => {
        this.filteredMovies = this.movies = movies;
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

  public explore(movie: Movie) {
    // this.http.get("/api/movie/Explore?movieFolderAddress=" + movie.folderAddress);
  }

  public selectAllGenres() {
    this.filterObj.genres.forEach(g => g.selected = true);
    this.change();
  }

  public selectNoneGenres() {
    this.filterObj.genres.forEach(g => g.selected = false);
    this.change();
  }
}
