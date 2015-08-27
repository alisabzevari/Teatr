var gulp = require('gulp');
var ts = require('gulp-typescript');
var serve = require('gulp-serve');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('tsc', function() {
  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  // return tsResult.js.pipe(gulp.dest('release'));
});

gulp.task('serve', serve('src'));

gulp.task("default", ["serve"]);
