const gulp   = require("gulp");
const uglify = require("gulp-uglify-es").default;
 
gulp.task("uglify-web", () => {
    return gulp.src("../release/web/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("../release/web/js/"));
});
