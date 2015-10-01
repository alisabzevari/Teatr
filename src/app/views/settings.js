(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
    var Settings = (function () {
        function Settings() {
            this.settings = [
                { active: true, path: "c:\\" },
                { active: false, path: "d:\\Movies" }
            ];
        }
        return Settings;
    })();
    exports.Settings = Settings;
});
