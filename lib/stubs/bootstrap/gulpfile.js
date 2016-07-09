var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'webapp'
        }
    })
});

gulp.task('default', ['browserSync'], function(){
    gulp.watch('webapp/**/*.xml', browserSync.reload);
    gulp.watch('webapp/**/*.js', browserSync.reload);
    gulp.watch('webapp/*.html', browserSync.reload);
    gulp.watch('webapp/css/*.css', browserSync.reload);
});