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
})(["require", "exports", "aurelia-framework"], function (require, exports) {
    var aurelia_framework_1 = require("aurelia-framework");
    var MaterializeAttr = (function () {
        function MaterializeAttr(element) {
            this.element = element;
        }
        MaterializeAttr.prototype.attached = function () {
            if (this.element.classList.contains("button-collapse"))
                $(this.element).sideNav();
            if (this.element.classList.contains("materialboxed"))
                $(this.element).materialbox();
            if (this.element.classList.contains("collapsible"))
                $(this.element).collapsible();
        };
        MaterializeAttr = __decorate([
            aurelia_framework_1.customAttribute("materialize", {}),
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], MaterializeAttr);
        return MaterializeAttr;
    })();
    exports.MaterializeAttr = MaterializeAttr;
});
// customAttribute signature was different from documentation
