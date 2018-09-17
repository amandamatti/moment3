const gulp      = require("gulp");
const concat    = require("gulp-concat");
const uglify    = require("gulp-uglify");
const cleanCSS  = require("gulp-clean-css");
const watch     = require("gulp-watch");
const imagemin  = require("gulp-imagemin");
const concatcss = require("gulp-concat-css");

/* Flytta och minifiera HTML-filer */
gulp.task("copyhtml", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("pub/"))
});

/* Sammanslå, flytta och minifiera CSS-filer */
gulp.task("copycss", function() {
    return gulp.src("src/css/*.css")
        .pipe(concatcss("main.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("pub/css"))
});

/* Sammanslå och minifiera JavaScript */
gulp.task("concminjs", function() {
    return gulp.src("src/js/*.js")
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("pub/js"));
});

/* Flytta och minifiera images */
gulp.task("copyimg", function() {
    return gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("pub/images"));
});

/* Kontrollera ändringar i filsystemet */
gulp.task("watcher", function() {
    watch("src/js/*.js", function() {
        gulp.start("concminjs");
    });

    watch("src/*.html", function() {
        gulp.start("copyhtml");
    });

    watch("src/css/*.css", function() {
        gulp.start("copycss")
    });

    watch("src/images/*", function() {
        gulp.start("copyimg");
    });
});

gulp.task("default", ["copyhtml", "copycss", "concminjs", "copyimg", "watcher"]);