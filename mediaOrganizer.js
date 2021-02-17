const mm = require('music-metadata');
const fs = require('fs-extra')
var path = require('path');

function organizeSong(fileName, basePath) {
	// body...

	var fullPath = "";
	var parsed = mm.parseFile(fileName)
		.then(metadata => {

			//Extract the filename:
			var baseFileName = path.basename(fileName);
			// console.log(baseFileName);

			var newPath = basePath + metadata.common.album + "/" + baseFileName
			console.log(fullPath);

			// fs.move(fileName, newPath, function (err) {
			// 	if (err) {
			// 		console.error(err.message);
			// 		console.error("unable to move file", fileName);
			// 	}
			// 	// console.log('Successfully renamed - AKA moved!')
			// })
		})
		.catch(err => {
			console.error(err.message);
			console.error("unable to move file", fileName);

		});

}

module.exports = {
	organizeSong: organizeSong
}
