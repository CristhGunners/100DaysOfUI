var gulp = require('gulp');

var jade = require('gulp-jade');

var stylus = require('gulp-stylus');
var nib = require('nib');

var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var autoprefixer = require('autoprefixer-stylus');

var concat = require('gulp-concat');

// Paths

var paths = {
    stylusEntry: './source/stylus/style.styl',
    stylusAll: './source/stylus/**/*.styl',
    jadeEntry: './source/*.jade',
    jadeAll: './source/templates/*.jade',
    jsEntry: './source/scripts/main.js',
    css: './site/css',
    js: './site/js',
    html: './site'
};

// Concat Js

gulp.task('scripts', function() {
  return gulp.src(['./scripts/vendor/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.js));
});


// Javascripts Compress
gulp.task('compressjs', function() {
  return gulp.src(paths.jsEntry)
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
    .pipe(reload({stream: true}));
});

// Jade Compile
gulp.task('jade2html', function() {
  gulp.src(paths.jadeAll)
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest(paths.html))
    .pipe(reload({stream: true}));
});

// Stylus Compile
gulp.task('stylus2css', function () {
  gulp.src(paths.stylusEntry)
    .pipe(stylus({
        use: [nib(), autoprefixer()],
        compress:true,
        'include css': true,
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(reload({stream: true}));
});

// Watch Files
gulp.task('serve', ['stylus2css', 'jade2html', 'compressjs'],function() {
  browserSync({
    server: {
      baseDir: './site'
    },
    open: false
  });
  gulp.watch(paths.jsEntry, ['compressjs']);
  //gulp.watch(paths.jsEntry, ['scripts']);
  gulp.watch(paths.stylusAll, ['stylus2css']);
  gulp.watch(paths.jadeAll, ['jade2html']);
});
