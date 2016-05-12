import {discoverMovie} from "../core/movie-discovery";
import {expect} from "chai";

describe("MovieDiscovery tests", function () {
  it("Should find a simple movie info by its name", function (done) {
    discoverMovie("matrix reloaded")
      .then(movieInfo => {
        expect(movieInfo.title == "The Matrix Reloaded");
        done();
      });
  });
});