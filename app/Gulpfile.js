/*jslint node: true */
"use strict";

/*
*
*
* Paths
*
*
*/
var paths = {
    scripts: {
        input: 'dev/assets/js/**/*.js',
        output: 'dist/js'
    },
    styles: {
        input: 'dev/assets/styles/**/*.{scss,sass}',
        output: 'dist/css'
    },
    html: {
        input: 'dev/templates/**/*.html',
        output: 'craft/templates'
    },
    images: {
        input: 'dev/assets/images/**/*',
        output: 'dist/images'
    },
    extras: {
        input: ['dev/extras/*', 'dev/index.php'],
        output: 'dist/'
    },
    plugins: {
        input: 'dev/plugins/**/*',
        output: 'craft/plugins'
    }
};

/*
*
*
* Plugins
*
*
*/

//General Plugins
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var flatten = require('gulp-flatten');

//Html Plugins
var htmlmin = require('gulp-htmlmin');

//Sass plugins
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;

//Image Plugins
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

//Javascript Plugins
var uglify = require('gulp-uglify');

//Browsersync
var browserSync = require("browser-sync").create();



/*
*
* CLEAN
* Removes the dist directory -
* cleans out all files that may no longer exist in dev
*/
gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

/*
*
* MOVE FILES
*
*/
//Master move task
gulp.task('move', ['move-extras', 'move-plugins']);

//Moves Craft plugins
gulp.task('move-plugins', function () {
    return gulp.src(paths.plugins.input)
        .pipe(gulp.dest(paths.plugins.output));
});

//Extra files - robot.txt, etc
gulp.task('move-extras', function () {
    return gulp.src(paths.extras.input)
        .pipe(gulp.dest(paths.extras.output));
});

/*
*
* HTML
* Minifies html, and moves it into the craft templates folder
*/
gulp.task('html', function () {
    return gulp.src(paths.html.input)
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.html.output));
});

/*
*
* SASS
*
*/
gulp.task('sass', function () {
    return gulp.src(paths.styles.input)
        .pipe(sass({
            includePaths: [].concat(bourbon, neat)
        }))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.styles.output))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/*
*
* IMAGES
*
*/
gulp.task('imagemin', function () {
    return gulp.src(paths.images.input)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.images.output));
});

/*
*
* JAVASCRIPT
*
*/
gulp.task('js', function () {
    return gulp.src(paths.scripts.input)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.output));
});

/*
*
* BROWSERSYNC AND RELOAD
*
*/
gulp.task('browser-sync', function () {
    browserSync.init({});
});

gulp.task('browser-sync-reload', function () {
    browserSync.reload();
});

/*
*
* WATCH
*
*/
gulp.task('watch', function () {

    //Watch HTML files
    gulp.watch(paths.html.input, ['html', 'browser-sync-reload']);

    //Watch Sass files
    gulp.watch(paths.styles.input, ['sass']);

});

//Default Task. - Clean, then recompile every asset on startup, then start watch
gulp.task('default', ['clean', 'move', 'browser-sync', 'html', 'sass', 'imagemin', 'js', 'watch']);
