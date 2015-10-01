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
    var MatChk = (function () {
        function MatChk(element) {
            this.element = element;
            this.uniqId = this.guid();
        }
        MatChk.prototype.guid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        MatChk.prototype.click = function () {
            var event = new CustomEvent("change");
            this.element.dispatchEvent(event);
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], MatChk.prototype, "value");
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], MatChk.prototype, "checked");
        MatChk = __decorate([
            aurelia_framework_1.customElement("mat-chk"),
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], MatChk);
        return MatChk;
    })();
    exports.MatChk = MatChk;
});
