const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const uglifyjs = require('uglify-js');
const minifier = require('gulp-uglify/minifier');
const pump = require('pump');
const jshint = require('gulp-jshint');
const stylelish = require('jshint-stylish');
const minify = require('gulp-minify');
const csslint = require('gulp-csslint');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('default', ['run', 'watch']);

gulp.task('run', ['jshint-minify', 'csslint-minify'], () => {
    nodemon({
        script: 'index.js'
    })
});

gulp.task('watch', () => {
    var watcher = gulp.watch('lib/**/*.*', ['jshint-minify', 'csslint-minify']);
    watcher.on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('uglify-minify', (cb) => {
    var options = {
        preserveComments: 'license'
    };

    pump([
            gulp.src('lib/js/*.js'),
            minifier(options, uglifyjs),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('jshint-minify', () => {
    gulp.src('lib/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylelish))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('csslint-minify', () => {
    gulp.src('lib/css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(cleanCSS())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/css'));
})