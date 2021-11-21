const gulp = require("gulp"),
    svgmin = require("gulp-svgmin"),
    svgstore = require("gulp-svgstore"),
    rename = require("gulp-rename"),
    inject = require("gulp-inject"),
    sass = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create();

var outDir = "./public";

gulp.task("svgstore", function () {
    const svgs = gulp.src("./src/**/images/icons/*.svg", {base: 'src/svg'})
        .pipe(rename({prefix: "icon-"}))
        .pipe(svgstore({inlineSvg: true}));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src("./src/**/*.html")
        .pipe(inject(svgs, {transform: fileContents}))
        .pipe(gulp.dest("./src/"));
});


gulp.task("sass", function () {
    return gulp.src("./src/**/*.sass")
        .pipe(sass())
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest(outDir));
});

gulp.task("html", function () {
    return gulp.src("./src/**/*.html").pipe(gulp.dest(outDir));
});

gulp.task("move:images", function () {
    return gulp.src("./src/**/images/**/*")
        .pipe(gulp.dest(outDir));
});

gulp.task("move:fonts", function () {
    return gulp.src("./src/**/fonts/**/*")
        .pipe(gulp.dest(outDir));
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: outDir,
        },
    });
});

gulp.task("build", gulp.series("svgstore", "sass", "html", "move:images", "move:fonts"));

gulp.task("default", gulp.series("svgstore", "move:fonts", "move:images", gulp.parallel("html", "sass"), "serve"));