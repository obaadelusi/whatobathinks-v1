// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
   return src('src/scss/main.scss', { sourcemaps: true })
      .pipe(sass())
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(dest('build/css', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
   return src('src/js/*.js', { sourcemaps: true })
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      .pipe(terser())
      .pipe(dest('build/js', { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
   browsersync.init({
      server: {
         baseDir: '.'
      },
      notify: {
         styles: {
            top: 'auto',
            bottom: '0'
         }
      }
   });
   cb();
}
function browserSyncReload(cb) {
   browsersync.reload();
   cb();
}

// Watch Task
function watchTask() {
   watch(['*.html', 'views/*.html'], browserSyncReload);
   watch(['src/scss/**/*.scss'], series(scssTask, browserSyncReload));
   watch(['src/js/*.js'], series(jsTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
