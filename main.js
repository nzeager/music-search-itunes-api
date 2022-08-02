// console.log('connected!');

let resultsDiv = document.querySelector('#results');
// console.log(resultsDiv);

let searchUrl = 'https://proxy-itunes-api.glitch.me/search?term=jack+johnson';

fetch(searchUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'text/javascript; charset=utf-8'}
    })
    // response is whatever the function returns
    .then(response => response.json())
    // data is whatever the above code returns, in this case response.json()
    .then(data => {
        let songs = data.results;
        console.log(songs);
        showTracks(songs);
    });

function showTracks (trackArray) {
    for(let track of trackArray) {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song");
        
        //image
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("songImg");
        let picture = document.createElement("img");
        picture.src = track.artworkUrl100;
        imageDiv.appendChild(picture);
        songDiv.appendChild(imageDiv);

        //track
        let trackDiv = document.createElement("div");
        trackDiv.classList.add("trackName");
        trackDiv.innerText = track.trackName;
        songDiv.appendChild(trackDiv);

        //artist
        let artistDiv = document.createElement("div");
        artistDiv.classList.add("artist");
        artistDiv.innerText = track.artistName;
        songDiv.appendChild(artistDiv);

        // append songDiv to results
        resultsDiv.appendChild(songDiv);
    }
}
