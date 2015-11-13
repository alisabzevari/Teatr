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
        this.filteredMovies = this.movies = movies.sort((a, b) => {
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
          return 0;
        });
        this.createFilterMaterials();
      });
  }

  public createFilterMaterials() {
    this.filterObj.genres = [];
    var genreNames = _(this.movies)
      .map(movie => movie.genre)
      .flatten()
      .uniq()
      .sortBy(g => g)
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
    this.moviesManager.explore(movie);
  }

  public openInImdb(movie: Movie) {
    this.moviesManager.openInImdb(movie);
  }

  public openSubtitles(movie: Movie) {
    this.moviesManager.openSubtitles(movie);
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
