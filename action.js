//find files from to copy
var path = require('path');

function updateBrain() {

    var srcPath = "/Users/vijaykiran225/Music";//"/Users/vijaykiran225/Temp/toCopy";
    var walk = require('walk');
    const fs = require('fs')

    var files = [];

    const recognizedSongExts = [".mp3", ".m4a", ".wav", ".wma", ".MP3"];
    // Walker options
    var walker = walk.walk(srcPath, { followLinks: false });
    document.getElementById("songs").innerHTML = "";
    walker.on('file', function (root, stat, next) {
        // Add this file to the list of files
        if (recognizedSongExts.includes(path.extname(stat.name))) {
            files.push(root + '/' + stat.name);
            var z = document.createElement('li'); // is a node
            z.innerHTML = `${stat.name}`;
            z.addEventListener("click", () => {
                selectedSong.song_name = `${stat.name}`;
                selectedSong.song_path = `${root + '/' + stat.name}`;
                document.getElementById("selectedSong").innerText = selectedSong.song_path;
            });
            document.getElementById("songs").appendChild(z);
        }
        next();
    });

    walker.on('end', function () {
        console.log(files.length);

        var fileData = "";

        for (const aFilePath of files) {
            fileData += aFilePath + "\n";
        }

        fs.writeFile('memo.m3u', fileData, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });


    });
}


function showBrain() {
    const lineReader = require('line-reader');
    document.getElementById("songs").innerHTML = "";
    const mm = require('music-metadata');

    lineReader.eachLine("./memo.m3u", function (aSongPath) {

        var parsed = mm.parseFile(aSongPath)
            .then(metadata => {
                let aState = {}
                aState.name = path.basename(aSongPath);
                aState.path = aSongPath;
                aState.album = metadata.common.album;
                gState.push(aState);


                var actDiv = document.createElement('div');

                var z = document.createElement('li'); // is a node
                z.innerHTML = aState.name + " from " + aState.album;
                z.addEventListener("click", () => {
                    selectedSong.song_path = `${aSongPath}`;
                    document.getElementById("selectedSong").innerText = selectedSong.song_path;
                    play();
                });

                var butt = document.createElement('button');
                butt.innerText = "copy";
                butt.onclick = () => copyButtonClicked(aSongPath, metadata.common.album);
                actDiv.appendChild(z);
                actDiv.appendChild(butt);

                document.getElementById("songs").appendChild(actDiv);
            })
            .catch(err => {
                console.error(err.message);
                console.error("unable to parse audio file", aSongPath);

            });

    });
}

function copyButtonClicked(inp, album) {


    toCopyPl.push({
        path: inp,
        album: album
    });
    var actDiv = document.createElement('div');

    var z = document.createElement('li'); // is a node
    z.innerText = inp;

    var butt = document.createElement('button');
    butt.innerText = "delete";
    // butt.onclick = () => copyButtonClicked(aSongPath);
    actDiv.appendChild(z);
    actDiv.appendChild(butt);
    document.getElementById("plsongs").appendChild(actDiv);

    // smooth scroll with Javascript:

    document.getElementById('plsongs').scrollIntoView({ behavior: 'smooth', block: 'end' });

}

function writeToFile() {
    const fs = require('fs-extra')

    console.log(toCopyPl);
    //Extract the filename:
    const basePath = "/Users/vijaykiran225/Temp/toCopy/";


    for (let index = 0; index < toCopyPl.length; index++) {
        const element = toCopyPl[index];

        var baseFileName = path.basename(element.path);
        // console.log(baseFileName);

        var newPath = basePath + element.album + "/" + baseFileName
        console.log(newPath);
        fs.copy(element.path, newPath, function (err) {
            if (err) {
                console.error(err.message);
                console.error("unable to move file", fileName);
            }
            // console.log('Successfully renamed - AKA moved!')
        })
    }
    document.getElementById('plsongs').innerHTML = "";



}