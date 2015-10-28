import {MovieDiscovery} from "../Core/MovieDiscovery"
import {SettingsProvider} from "../Core/SettingsProvider"

import chai = require('chai');
var expect = chai.expect;

// describe("Movie Discovery Unit Tests", () => {
// 	it("Should discover blade runner movie by its name", () => {
// 	});
// });

let discovery = new MovieDiscovery();
// discovery.discoverMovie("blade runner")
// 	.then(movie => console.log(movie));
discovery.discoverMoviesInDirectory("F:\\Movies 4")
	.then(() => console.log("finished"));