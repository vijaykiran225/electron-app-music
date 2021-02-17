// main.js
function parseFiles(playlistPath) {

    var organizer = require("./mediaOrganizer");

    const libPath = "/Users/vijaykiran225/Music/OrganizedMusic/";

    const lineReader = require('line-reader');

    lineReader.eachLine(playlistPath, function (aSongPath) {
        organizer.organizeSong(aSongPath, libPath);
    });
}