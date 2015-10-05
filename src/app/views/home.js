var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", "aurelia-framework", "../Backend/Movies", "lodash"], function (require, exports) {
    var aurelia_framework_1 = require("aurelia-framework");
    var Movies_1 = require("../Backend/Movies");
    var _ = require("lodash");
    var Home = (function () {
        function Home(moviesManager) {
            var _this = this;
            this.moviesManager = moviesManager;
            this.filterObj = {};
            this.moviesManager.getAll()
                .then(function (movies) {
                _this.filteredMovies = _this.movies = movies;
                _this.createFilterMaterials();
            });
        }
        Home.prototype.createFilterMaterials = function () {
            var _this = this;
            this.filterObj.genres = [];
            var genreNames = _(this.movies)
                .map(function (movie) { return movie.genre; })
                .flatten()
                .uniq()
                .value();
            _.forEach(genreNames, function (g) {
                _this.filterObj.genres.push({ name: g, selected: true });
            });
        };
        Home.prototype.change = function () {
            var selectedGenres = _(this.filterObj.genres).filter(function (fg) { return fg.selected; }).map(function (fg) { return fg.name; }).value();
            this.filteredMovies = _.filter(this.movies, function (movie) { return _.any(movie.genre, function (g) { return _.contains(selectedGenres, g); }); });
        };
        Home.prototype.explore = function (movie) {
            // this.http.get("/api/movie/Explore?movieFolderAddress=" + movie.folderAddress);
        };
        Home.prototype.selectAllGenres = function () {
            this.filterObj.genres.forEach(function (g) { return g.selected = true; });
            this.change();
        };
        Home.prototype.selectNoneGenres = function () {
            this.filterObj.genres.forEach(function (g) { return g.selected = false; });
            this.change();
        };
        Home = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Movies_1.Movies])
        ], Home);
        return Home;
    })();
    exports.Home = Home;
});
