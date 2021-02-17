function prev() {

}



function play() {

    let ap = document.getElementById("audioPlayer");
    console.log(selectedSong);
    ap.src = `file://${selectedSong.song_path}`;
    ap.play();
}

function pause() {

    let ap = document.getElementById("audioPlayer");
    ap.pause();
}




function next() {

}



