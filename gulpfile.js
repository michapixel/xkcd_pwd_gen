/*
 *
 */
'use strict';
// 
const path = require('path'),
    fs = require('fs');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
const livereload = require('gulp-livereload');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const size = require('gulp-size');
const pump = require('pump');

const trace = function(o) {
    console.log(o);
};
// 
const srcDir = './src';
const destDir = './docs';
const config = {
    html: {
        src: srcDir + '/index.html',
        dest: destDir
    },
    js: {
        src: srcDir + '/js/**/*.js',
        dest: destDir + '/js',
        options: {
            compress: false,
            mangle: false,
            output: {
                beautify: true,
                comments: false,
                quote_style: 3,
                // semicolons: false,
            }
        },
        libs: {
            srcs: [
                srcDir + '/js/anime.min.js',
                srcDir + '/js/mobile-detect.min.js',
                srcDir + '/js/gmap3.min.js',
            ],
            dest: destDir + '/js',
        }
    },
    css: {
        src: srcDir + '/_scss/**/*.scss',
        dest: destDir + '/css',
        options: {
            includePaths: 'imports',
            outputStyle: 'compressed',
            sourceComments: false,
        }
    },
    img: {
        src: srcDir + '/img/**/*.{png,jpg,svg}',
        dest: destDir + '/img',
        options: {
            pngquant: true,
            optipng: false,
            zopflipng: false,

            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,

            guetzli: false,

            gifsicle: true,
            svgo: false,

            concurrent: 10
        },
        etc: {
            srcs: [
                srcDir + '/img/**/*.{svg}',
            ],
            dest: destDir + '/img'
        }
    },
    etc: {
        src: srcDir + '/data/**/*',
        dest: destDir + '/data'
    },
    vendor: {
        src: srcDir + '/vendor/**/*.{js,css}',
        dest: destDir + '/vendor',
    }
};
// 
gulp.task('clean', function(done) {
    let options = {
        allowEmpty: true,
        read: false
    }
    // remove css files
    gulp.src(destDir + '/css/**/*', options)
        .pipe(rm({ async: false }));
    // remove img files
    gulp.src(destDir + '/img/**/*', options)
        .pipe(rm({ async: false }));
    // remove js files
    gulp.src(destDir + '/js/**/*', options)
        .pipe(rm({ async: false }))
    // remove etc files
    gulp.src(destDir + '/data/**/*', options)
        .pipe(rm({ async: false }))
    // remove vendor files
    gulp.src(destDir + '/vendor/**/*', options)
        .pipe(rm({ async: false }))
    // remove html files
    gulp.src([destDir + '/index.html'], options)
        .pipe(rm({ async: false }));
    // 
    done();
});
// 
gulp.task('create', function(done) {
    gulp.series('html', 'js', 'scss', 'images', 'etc', 'vendor', function(done) {
        trace('create finished ...')
        done();
    })();
    done();
});
// 
gulp.task('html', function(done) {
    return gulp.src(config.html.src)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(gulp.dest(config.html.dest))
        .pipe(livereload());
});
// 
gulp.task('js', function(cb) {
    return gulp.src(config.js.src)
        .pipe(uglify(config.js.options).on('error', function(e) {
            console.error(e.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest(config.js.dest))
        .pipe(livereload());
});
gulp.task('vendor', function(cb) {
    return gulp.src(config.vendor.src)
        .pipe(gulp.dest(config.vendor.dest));
});
// 
gulp.task('images', function(done) {
    // gulp.src(config.img.etc.srcs).pipe(gulp.dest(config.img.etc.dest));
    return gulp.src(config.img.src)
        // .pipe(newer(imgDest))
        .pipe(image(config.img.options))
        .pipe(size())
        .pipe(gulp.dest(config.img.dest))
        .pipe(livereload());
    // done();
});
// 
gulp.task('scss', function(done) {
    return gulp.src(config.css.src)
        .pipe(sass(config.css.options).on('error', sass.logError))
        .pipe(gulp.dest(config.css.dest))
        .pipe(livereload());
});
gulp.task('etc', function(done) {
    return gulp.src(config.etc.src)
        .pipe(gulp.dest(config.etc.dest))
        .pipe(livereload());
});
// 
gulp.task('watch', function() {
    livereload.listen({ basePath: './dist' });
    gulp.watch(config.img.src, gulp.parallel('images'));
    gulp.watch(config.css.src, gulp.parallel('scss'));
    gulp.watch(config.vendor.src, gulp.parallel('vendor'));
    gulp.watch(config.js.src, gulp.parallel('js'));
    gulp.watch(config.html.src, gulp.parallel('html'));
    gulp.watch(config.etc.src, gulp.parallel('etc'));
});

// 
gulp.task('default', gulp.series('clean', 'create', 'watch', function(done) {
    // 
    done();
}));