var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: ''
        }
    })
});

gulp.task('default', ['browserSync'], function(){
    gulp.watch('**/*.xml', browserSync.reload);
    gulp.watch('**/*.js', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('css/*.css', browserSync.reload);
});