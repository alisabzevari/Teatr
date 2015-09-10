import {HttpClient} from "aurelia-http-client";
import {autoinject} from "aurelia-framework";
import {Movie} from "../model/Movie";

@autoinject()
export class Home {
  public movies: Movie[];
  constructor(private http: HttpClient) {
    this.http.get("/api/movie")
      .then(response => this.movies = response.content);
  }
}
