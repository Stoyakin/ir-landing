const fs = require('fs');
const gulp = require('gulp');
const rebaseCSSurls = require('gulp-rebase-css-urls');
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const print = require('gulp-print').default;
const notify = require('gulp-notify');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const del = require("del");
const data = require("gulp-data");
const $ = require('gulp-load-plugins')();

// Пути
const src = {
  'app': {
    'stylus': 'app/stylus/',
    'css': 'app/css/',
    'js': 'app/js/',
    'vendor': 'app/vendor/',
    'pug': 'app/pug/',
    'fonts': 'app/fonts/**/*.*',
    'img': 'app/img/**/*.*'
  },
  'build': {
    'css': 'prod/static/css/',
    'js': 'prod/static/js/',
    'fonts': 'prod/static/fonts/',
    'img': 'prod/static/img/',
    'tmpl': 'prod'
  }
};

// Билд CSS
function css(src, dst) {
  return function () {
    return gulp.src(src)
      .pipe($.plumber({
        errorHandler: $.notify.onError({
          title: 'CSS error',
          message: '<%= error.message %>'
        })
      }))
      .pipe(print())
      .pipe(rebaseCSSurls('.'))
      .pipe($.postcss([
        autoprefixer()
      ]))
      .pipe($.concat('styles.css'))
      .pipe(gulp.dest(dst))
      .pipe($.notify({
        title: 'CSS',
        message: 'CSS build complete',
        onLast: true
      }))
      .pipe(reload({
        stream: true
      }));
  }
}

// Упаковка CSS
function csspack(src, dst) {
  return function () {
    return gulp.src(src)
      .pipe($.plumber({
        errorHandler: $.notify.onError({
          title: 'CSS PACK error',
          message: '<%= error.message %>'
        })
      }))
      .pipe(print())
      .pipe($.postcss([
        require('cssnano')({
          discardComments: {
            removeAll: true
          },
          discardUnused: {
            namespace: false
          }
        })
      ]))
      .pipe($.concat('styles.pack.css'))
      .pipe(gulp.dest(dst))
      .pipe($.notify({
        title: 'CSS PACK',
        message: 'CSS PACK complete',
        onLast: true
      }))
      .pipe(reload({
        stream: true
      }));
  }
}

// Билд JS
function js(src, dst, fileName) {
  return function () {
    return gulp.src(src)
      .pipe($.sourcemaps.init())
      .pipe(babel({
        presets: ["@babel/preset-env"],
        minified: true
      }))
      .pipe($.plumber({
        errorHandler: $.notify.onError({
          title: 'JS error',
          message: '<%= error.message %>'
        })
      }))
      .pipe($.notify({
        title: 'JS-babel',
        message: 'JS-babel complete'
      }))
      .pipe($.changed(dst, {
        extension: '.js'
      }))
      .pipe(print())
      .pipe($.concat(fileName))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(dst))
      .pipe($.notify({
        title: 'JS',
        message: 'JS build complete',
        onLast: true
      }))
      .pipe(reload({
        stream: true
      }));
  }
}

function jsVendor(src, dst, fileName) {
  return function () {
    return gulp.src(src)
      .pipe($.sourcemaps.init())
      .pipe($.plumber({
        errorHandler: $.notify.onError({
          title: 'JS error',
          message: '<%= error.message %>'
        })
      }))
      .pipe($.changed(dst, {
        extension: '.js'
      }))
      .pipe(print())
      .pipe($.concat(fileName))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(dst))
      .pipe($.notify({
        title: 'JS-vendor',
        message: 'JS-vendor complete',
        onLast: true
      }))
      .pipe(reload({
        stream: true
      }));
  }
}

gulp.task('clean-min', function(cb) {
  return del([
    src.build.tmpl+'/*.html',
    src.build.css,
    src.build.js
  ], cb);
});

gulp.task('clean', function(cb) {
  return del([ src.build.tmpl ], cb);
});

// Таски
// Компилим pug
gulp.task('pug', function buildHTML() {
  return gulp.src(src.app.pug + '*.pug')
    .pipe($.changed(src.build.tmpl, {
      extension: '.html'
    }))
    .pipe($.if(global.isWatching, $.cached('pug')))
    .pipe(pugInheritance({
      basedir: 'app/pug/',
      skip: 'node_modules'
    }))
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: 'Styles compilation error',
          message: err.messagegulp
        })(err);
        this.emit('end');
      }
    }))
    .pipe(print(function (filepath) {
      return "Pug start build: " + filepath;
    }))
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync(src.app.pug +'includes/data/data.json'));
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(src.build.tmpl))
    .pipe(reload({
      stream: true
    }));
});

// Компилим CSS
gulp.task('stylus', function () {
  return gulp.src(src.app.stylus + 'styles.styl')
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: 'Styles compilation error',
          message: err.messagegulp
        })(err);
        this.emit('end');
      }
    }))
    .pipe(print())
    .pipe(stylus({
      'include css': true,
      compress: false
    }))
    .pipe(gulp.dest(src.app.css))
    .pipe($.notify({
      title: 'STYLUS',
      message: 'STYLUS build complete',
      onLast: true
    }));
});

// Собираем CSS
gulp.task('css', css([
    src.app.css + 'fonts.css',
    src.app.css + 'styles.css'
  ],
  src.build.css
));

// Пакуем CSS
gulp.task('csspack', csspack([src.build.css + 'styles.css'], src.build.css));

// Собираем JS
gulp.task('js-own', js([src.app.js + 'common.js'], src.build.js, 'own.js'));

gulp.task('js-vendor', jsVendor([
    src.app.js + 'ext/polyfill.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/swiper/dist/js/swiper.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
  ],
  src.build.js,
  'vendor.js'
));

gulp.task('js', function () {
  gulp.start('js-vendor');
  gulp.start('js-own');
});

gulp.task('fonts', function (done) {
  gulp.src(src.app.fonts)
    .pipe(gulp.dest(src.build.fonts));
  done();
});

gulp.task('image', function (done) {
  gulp.src(src.app.img)
    .pipe(gulp.dest(src.build.img));
  done();
});

gulp.task('video', function (done) {
  gulp.src('app/video/**/*.*')
    .pipe(gulp.dest('prod/static/video/'));
  done();
});

gulp.task('setWatch', function (done) {
  global.isWatching = true;
  done();
});

// browser-sync task for starting the server.
gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: "./prod",
      directory: true
    }
  });
  done();
});

// Reload all Browsers
gulp.task('bsReload', function () {
  browserSync.reload();
});

// Watch-таск
gulp.task('watch', gulp.series('browserSync', function () {
  gulp.watch(src.app.pug + '*.pug', gulp.series('setWatch', 'pug'));
  gulp.watch(src.app.stylus + '**/*.styl', gulp.series('stylus'));
  gulp.watch(src.app.css + 'styles.css', gulp.series('css'));
  //gulp.watch(src.build.css + 'styles.css', gulp.series('csspack'));
  gulp.watch(src.app.js + '**/*.js', gulp.series('js-own'));
  gulp.watch(src.app.img, gulp.series('image'));
}));

// Сборка проекта
gulp.task('clean-min', gulp.series('clean-min'));
gulp.task('js', gulp.series('js-vendor', 'js-own'));
gulp.task('css-build', gulp.series('stylus', 'css', 'csspack' ));
gulp.task('pug-build', gulp.series('setWatch', 'pug'));

gulp.task('build', gulp.series('clean', gulp.parallel(gulp.series('setWatch', 'pug'), gulp.series('stylus', 'css', /*'csspack'*/ ), 'js', 'image', 'fonts', 'video')));

// Дефолтный таск
gulp.task('default', gulp.series('build', 'browserSync'));
