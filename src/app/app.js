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
})(["require", "exports", "materialize", "aurelia-framework", "aurelia-router"], function (require, exports) {
    require("materialize");
    var aurelia_framework_1 = require("aurelia-framework");
    var aurelia_router_1 = require("aurelia-router");
    var App = (function () {
        function App(router) {
            this.router = router;
            this.router.configure(function (config) {
                config.title = "Teatr";
                config.map([
                    { route: ["", "home"], name: "home", moduleId: "views/home", nav: true, title: "Home" },
                    { route: "settings", name: "settings", moduleId: "views/settings", nav: true, title: "Settings" },
                    { route: "manage", name: "manage", moduleId: "views/manage", nav: true, title: "Manage" }
                ]);
                return config;
            });
        }
        App = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router), 
            __metadata('design:paramtypes', [aurelia_router_1.Router])
        ], App);
        return App;
    })();
    exports.App = App;
});
