const del    = require("del");
const gulp   = require("gulp");
const uglify = require("gulp-uglify-es").default;
 
gulp.task("web:uglify", () => {
    return gulp.src("../release/web/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("../release/web/js/"));
});

gulp.task("web:delextra", () => {
    return del(["../release/web/code.js"], { force: true });
});

gulp.task("laya", ["web:delextra", "web:uglify"], () => {
});
