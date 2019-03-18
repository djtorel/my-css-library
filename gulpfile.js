const postcss = require('gulp-postcss');
const less = require('gulp-less');
const gulp = require('gulp');
const rename = require('gulp-rename');
const precss = require('precss');
const rucksack = require('rucksack-css');
const cssnano = require('cssnano');

const srcPath = './src/*.less';
const watchPath = './src/**/*.less';

gulp.task('css', () => {
  const processors = [precss({}), rucksack({})];
  return gulp
    .src(srcPath)
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('./build'));
});

gulp.task('css:minify', () => {
  const processors = [precss({}), rucksack({}), cssnano({})];
  return gulp
    .src(srcPath)
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(rename({ suffix: '.min', extname: '.css' }))
    .pipe(gulp.dest('./build'));
});

gulp.task(
  'watch:css',
  gulp.series(['css'], () => {
    gulp.watch(watchPath, gulp.series(['css']));
  })
);

gulp.task('default', gulp.parallel(['watch:css']));
