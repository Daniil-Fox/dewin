import browserSync from "browser-sync";
import fileInclude from "gulp-file-include";

export const copySrc = () => {
  return app.gulp
    .src([`${app.paths.base.src}/**/*.html`, `!${app.paths.base.src}/*.html`])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
        maxRecursion: 100,
      })
    )
    .pipe(app.gulp.dest(app.paths.buildSrc))
    .pipe(browserSync.stream());
};
