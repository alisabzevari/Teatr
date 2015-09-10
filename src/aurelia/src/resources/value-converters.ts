import {Movie} from "../model/Movie";
import {FilterObject} from "../model/FilterObject";
import * as _ from "lodash";


export class FilterMovieValueConverter {
  toView(movies: Movie[], filterObj: FilterObject) {
    var selectedGenres = _(filterObj.genres).filter(fg => fg.selected).map(fg => fg.name).value();
    return _.filter(movies, movie => _.any(movie.genre, g => _.contains(selectedGenres, g)));
  }
}
