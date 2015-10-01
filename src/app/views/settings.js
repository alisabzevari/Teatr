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
})(["require", "exports", "../Backend/SettingsProvider", "aurelia-framework"], function (require, exports) {
    var SettingsProvider_1 = require("../Backend/SettingsProvider");
    var aurelia_framework_1 = require("aurelia-framework");
    var Settings = (function () {
        function Settings(settings) {
            this.settings = settings;
        }
        Settings = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [SettingsProvider_1.SettingsProvider])
        ], Settings);
        return Settings;
    })();
    exports.Settings = Settings;
});
