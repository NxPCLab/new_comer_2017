const _gulp = require("gulp");
const _imagemin = require("gulp-imagemin");
const _imageminJpg = require('imagemin-jpeg-recompress');
const _imageminPng = require('imagemin-pngquant');
const _imageminGif = require('imagemin-gifsicle');
const _browserify = require('browserify');
const _source = require('vinyl-source-stream');

const paths = {
	src: "src/res",
	dst: "dst/res"
};

_gulp.task("js", function(){
	_browserify({
		entries: ["src/app.js"]
	})
	.bundle()
	.pipe(_source("bundle.js"))
	.pipe(_gulp.dest("dst/js/"));
});

_gulp.task("img", function(){
    let srcGlob = paths.src + "/*.+(jpg|jpeg|png|gif)";
    let dstGlob = paths.dst;
    _gulp.src( srcGlob )
        .pipe(_imagemin([
            _imageminPng(),
            _imageminJpg(),
            _imageminGif({
                interlaced: false,
                optimizationLevel: 3,
                colors:180
            })
        ]))
    .pipe(_gulp.dest(dstGlob));
});