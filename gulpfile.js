var gulp = require("gulp");
var autoprefixer = require('gulp-autoprefixer');
var purify = require('gulp-purifycss');


gulp.task('autoprefix', function (){
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest("dist/style"))
})


gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(purify(['**/*.css', '**/*.html']))
        .pipe(gulp.dest('dist/style'));
});