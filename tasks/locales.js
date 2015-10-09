import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import yargs from 'yargs';

let argv = yargs.argv;
let watch = !!argv.watch;

gulp.task('locales', () => {
  return gulp.src('app/_locales/**/*.json')
    .pipe(gulp.dest('dist/_locales'))
    .pipe(gulpif(watch, livereload()));
});
