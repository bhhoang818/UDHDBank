import {
	src,
	dest
} from "gulp";
import sass from "gulp-sass";
import concat from "gulp-concat";
import sourcemap from "gulp-sourcemaps";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import cssSort from "css-declaration-sorter";
import autoprefixer from "autoprefixer";

export const sassTask = () => {
	return src([
			"src/components/core/_**.sass",
			"src/components/core/**.sass",
			"src/components/**/**.sass",
		])
		.pipe(concat("main.min.sass"))
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 version", "IE 9"],
				cascade: false
			}),
			cssnano(),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(dest("dist/css"))
};
module.exports = sassTask;