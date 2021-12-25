"use strict";
const { src, dest, series, watch, lastRun, parallel } = require("gulp");
const gutil = require("gulp-util");
const sass = require("gulp-sass");
const packageImporter = require("node-sass-package-importer");
const typescript = require("gulp-typescript");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const prettify = require("gulp-prettify");
const htmlhint = require("gulp-htmlhint");
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

const PATHS = {
  html: {
    src: "src/**/*.html",
    dest: "./dist"
  },
  styles: {
    src: "./src/assets/scss/**/*.scss",
    dest: "./dist/css"
  },
  scripts: {
    src: "./src/typescript/**/*.ts",
    dest: "./dist/js"
  },
  image: {
    src: "./src/assets/image/**",
    dest: "./dist/image"
  },
  assets: {
    src: "./src/assets/**/*.*",
    dest: "./dist/assets"
  }
};

// methods
function errorHandler(err, stats) {
  if (err || (stats && stats.compilation.errors.length > 0)) {
    const error = err || stats.compilation.errors[0].error;
    notify.onError({ message: "<%= error.message %>" })(error);
    this.emit("end");
  }
}

// html
function html() {
  return src(PATHS.html.src, { since: lastRun(html) })
    // .pipe(
    //   prettify({
    //     indent_char: " ",
    //     indent_size: 2,
    //     unformatted: ["a", "span", "br"]
    //   })
    // )
    .pipe(dest(PATHS.html.dest));
}

// scss
function styles() {
  return src(PATHS.styles.src)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(
      sass({
        outputStyle: "expanded",
        importer: packageImporter({
          extensions: [".scss", ".css"]
        })
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(dest(PATHS.styles.dest))
    .pipe(
      rename(function (path) {
        if (/^style_/.test(path.basename)) {
          path.basename = "style_latest";
        }
      })
    )
    .pipe(dest(PATHS.styles.dest))
    .pipe(browserSync.stream());
}

// assets
function copyAssets() {
  return src(PATHS.assets.src)
    .pipe(dest(PATHS.assets.dest))
    .on("end", browserSync.reload);
}

// typescript
function ts() {
  return src(PATHS.scripts.src)
    .pipe(
      typescript(
        'tsconfig.json',
        {
          target: "ES6"
        }
      )
    )
    .js.pipe(dest(PATHS.scripts.dest));
}

// images
function image() {
  return src(PATHS.image.src)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(changed(PATHS.image.dest))
    .pipe(imagemin([
      pngquant({
        quality: '65-80',
        speed: 1,
        floyd: 0,
      }),
      mozjpeg({
        quality: 85,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(dest(PATHS.image.dest))
}

// server
const browserSyncOption = {
  open: false,
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: PATHS.html.dest, // output directory,
    index: "index.html"
  }
};
function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}

// browser reload
function browserReload(done) {
  browserSync.reload();
  done();
  console.info("Browser reload completed");
}

// watch
function watchFiles(done) {
  watch(PATHS.html.src, series(html, browserReload));
  watch(PATHS.styles.src, styles);
  watch(PATHS.scripts.src, ts);
  watch(PATHS.image.src, image);
  done();
}

// commands
exports.default = series(
  parallel(html, ts, copyAssets),
  series(browsersync, watchFiles)
);