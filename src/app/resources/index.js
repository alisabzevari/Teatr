(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    function configure(aurelia) {
        aurelia
            .globalResources("materialize")
            .globalResources("mat-chk");
    }
    exports.configure = configure;
});
// Couldn't use typescript typing because it was different with js library
