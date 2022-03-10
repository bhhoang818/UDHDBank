import {
	src,
	dest
} from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
export const pugToHtml = () => {
	return src([
			"src/components/**/**.pug"
		])
		.pipe(plumber())
		.pipe(pug({
			pretty: "\t",

		}))
		.pipe(dest("dist/components"))
};

module.exports = pugToHtml;
