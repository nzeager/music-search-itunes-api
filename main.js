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
        // console.log(songs);
        for(let song of songs) {

        }
    });