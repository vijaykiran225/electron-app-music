//find files from to copy


function updateBrain() {



    var path = require('path');
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

    lineReader.eachLine("./memo.m3u", function (aSongPath) {
        var z = document.createElement('li'); // is a node
        z.innerHTML = `${aSongPath}`;
        z.addEventListener("click", () => {
            selectedSong.song_path = `${aSongPath}`;
            document.getElementById("selectedSong").innerText = selectedSong.song_path;
        });
        document.getElementById("songs").appendChild(z);
    });
}

