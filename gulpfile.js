"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var flexbugs = require("postcss-flexbugs-fixes");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var minifycss = require("gulp-csso");
var minhtml = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var del = require("del");
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task("style", function(done) {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      flexbugs()
    ]))
    .pipe(gulp.dest("docs/css"))
    .pipe(minifycss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());

  done()
});

gulp.task("minhtml", function() {
  return gulp.src('source/*.html')
    .pipe(minhtml({collapseWhitespace: true}))
    .pipe(gulp.dest("docs"));
});

gulp.task("serve", function() {
  server.init({
    server: "docs/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("style"));
  gulp.watch("source/*.html",  gulp.series("html")).on("change", server.reload);
  gulp.watch("source/js/modules/*.js", gulp.series("js")).on("change", server.reload);
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task('js', function(done){ // Создаем таск Sass
  gulp.src([
    'source/js/swiper.min.js',
    'source/js/*.js'
  ]) // Берем источник
      .pipe(concat('app.js'))
      .pipe(minify())
      .pipe(gulp.dest('docs/js/')) // Выгружаем результата в папку app/js
      done()
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/videos/**",
    "source/**/*.html"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"));
});

gulp.task("clean", function () {
  return del("docs");
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("docs"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy",
    "js",
    "style"
  )
);
