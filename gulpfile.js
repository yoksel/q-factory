"use strict";

var gulp = require("gulp");
var server = require("browser-sync");
var copy = require("gulp-copy");
var del = require("del");
var zip = require("gulp-zip");
var projectName = "SVG_Decorations";


gulp.task("del", function() {
  del(['build/']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task("build",["del"], function() {
  return gulp.src(["decoration.html","assets/**/*"])
        .pipe(copy("build/"));
});

gulp.task("zip", ["build"], () => {
  return gulp.src('build/**/*')
    .pipe(zip(projectName + '.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task("serve", function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch(["*.html","assets/**/*.*"]).on('change', server.reload);
});
