// console.log('connected!');

const resultsDiv = document.querySelector('#results');
// console.log(resultsDiv);

let searchUrl = '';

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchBox = document.querySelector('#search-box');
    let urlEnd = searchBox.value.replaceAll(' ', '+');
    searchUrl = 'http://httpstat.us/404';
    // 'https://proxy-itunes-api.glitch.me/search?term=';
    searchUrl = `${searchUrl}${urlEnd}&limit=50`;
    clearTracks();
    getSearchResults(searchUrl);

})

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'text/javascript; charset=utf-8'}
        })
        // response is whatever the function returns
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            } else {
                console.log(response);
                return response.json();
            }
        })
        // data is whatever the above code returns, in this case response.json()
        .then(data => {
            let songs = data.results;
            showTracks(songs);
            isEmpty();
        }).catch(error => {
            console.log(error);
            alert(`Your request failed, for the reason: ${error}`);
        })
}

function showTracks (trackArray) {
    for(let track of trackArray) {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song");
        
        //image
        let imageTag = document.createElement("img");
        imageTag.classList.add("songImg");
        imageTag.src = track.artworkUrl100;
        songDiv.appendChild(imageTag);

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

        //audio
        let audioTag = document.createElement("audio");
        audioTag.classList.add("audio");
        audioTag.src = track.previewUrl;
        audioTag.controls = true;
        songDiv.appendChild(audioTag);

        // append songDiv to results
        resultsDiv.appendChild(songDiv);
    }
}

function clearTracks(){
    // looping through each child of the search results list and remove each child
    while (resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.firstChild)
    }
}

function isEmpty() {
    if (results.firstChild === null){
        let errorMessage = document.createElement("p");
        errorMessage.classList.add("err");
        errorMessage.innerText = "This did not return any results. Please try another search.";
        resultsDiv.appendChild(errorMessage);
    }
}