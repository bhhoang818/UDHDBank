import {
	watch,
	series,
	parallel
} from "gulp"
import bSync from "browser-sync";

import jsCore from "./core-js"
import jsTask from "./script"
import pugTask from "./html"
import pugToHtml from "./pugToHtml"
import cssCore from "./core-css"
import sassTask from "./css"
import {
	copyImage
} from "./copy";
import {
	copyWebfonts
} from "./copy";
import {
	cleanImage
} from "./clean";

export const server = () => {
	bSync.init({
		notify: true,
		server: {
			baseDir: "dist",
		},
		port: 8000
	})

	watch([
		"src/js/main.js"
	], series(jsTask));


	watch([
		"src/**/**.pug"
	], series(pugTask));

	watch([
		"src/components/**/**.pug"
	], series(pugToHtml));


	watch([
		"src/components/**/**.sass",
	], series(sassTask));

	watch([
		"src/images/**/**.{svg,png,jpg,speg,gif,jpge,PNG,JPGE,JPG,SVG,GIF,SPEG}"
	], series(cleanImage, copyImage));

	watch([
		"src/webfonts/**"
	], series(copyWebfonts));

	watch([
		"src/_plugins/**/**.css", "src/_plugins/**/**.js", "config.json"
	], parallel(jsCore, cssCore));

	watch([
		"dist"
	]).on("change", bSync.reload);
}

module.exports = server;