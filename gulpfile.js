'use strict';

var gulp = require('gulp');
var server = require('browser-sync');
var copy = require('gulp-copy');
var del = require('del');
var zip = require('gulp-zip');
var include = require('gulp-include');
var svgmin = require('gulp-svgmin');
var currentDate = getCurrentDate();

var projectName = 'SVG_Decoration_' + currentDate;

gulp.task('svgmin', function () {
    return gulp.src('src/sketch/*.svg')
        .pipe(svgmin({
            plugins: [{
                cleanupNumericValues: {
                    floatPrecision: 2
                }
            }],
            js2svg: {
                pretty: true
            }
        }))
        .pipe(gulp.dest('src/img/svg'));
});

gulp.task('del', function() {
  del(['build/']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('build',['del'], function() {
  return gulp.src(['decoration.html','assets/**/*'])
        .pipe(copy('build/'));
});

gulp.task('zip', ['build'], () => {
  return gulp.src('build/**/*')
         .pipe(zip(projectName + '.zip'))
         .pipe(gulp.dest('.'));
});

gulp.task('include', function() {
  return gulp.src('src/*.html')
         .pipe(include())
               .on('error', console.log)
         .pipe(gulp.dest('.'));
        //  .pipe(server.reload({stream: true}));
});

gulp.task('serve', ['include'], function() {
  server.init({
    server: '.',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch(['assets/**/*.*']).on('change',server.reload);
  gulp.watch('**/*.html',['include']);

});

//---------------------------------------------

function getCurrentDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  if ( day < 10) {
    day = '0' + day;
  }
  if ( month < 10) {
    month = '0' + month;
  }
  return day + '_' + month;

}
