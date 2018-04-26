// Requirements
// ==================================================================
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function(){
    console.log("Run gulp watch to compile scss");
});

gulp.task('compile-sass', function(){
    return gulp.src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
    gulp.watch('*.scss', ['compile-sass'])
});