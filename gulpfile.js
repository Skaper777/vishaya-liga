"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var flexbugs = require("postcss-flexbugs-fixes");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var minifycss = require("gulp-csso");
var minjs = require("gulp-uglify");
var minhtml = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var run = require("run-sequence");
var del = require("del");
var pump = require('pump');

gulp.task("style", function() {
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
});

gulp.task("minjs", function (cd) {
  pump([
      gulp.src("docs/js/*.js"),
      minjs(),
      gulp.dest("docs/js")
    ],
    cd
  );
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

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["jsChange"]).on("change", server.reload);
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
});

gulp.task("webp", function () {
  return gulp.src("source/img/content/**/*.{png,jpg}")
    .pipe(webp({quality: 40}))
    .pipe(gulp.dest("source/img/content"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
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
  // .pipe(posthtml)
    .pipe(gulp.dest("docs"));
});

gulp.task("copyjs", function () {
  return gulp.src([
    "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"));
});

gulp.task("jsChange", function (done) {
  run(
    "copyjs",
    // "minjs",
    done
  );
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    // "minhtml",
    "style",
    "jsChange",
    done
  );
});
