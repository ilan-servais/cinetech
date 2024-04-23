const apiUrl = "https://api.themoviedb.org/3/trending/tv/week?api_key=57be7838f9d1d893350a3227c0e862a5"
const tvDetails = document.getElementById("tv-details")
const urlParams = new URLSearchParams(window.location.search);
const tvId = urlParams.get('id');


fetch(`https://api.themoviedb.org/3/tv/${tvId}?api_key=57be7838f9d1d893350a3227c0e862a5`)
    .then(response => response.json())
    .then(data => {
        const tvItem = document.createElement("div")
        tvItem.innerHTML = `
            <div id="tv-item">
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
                <div id="tv-info">
                    <h1>${data.name}</h1>
                    <p>${data.overview}</p>
                </div>
            </div>
        `
        tvDetails.appendChild(tvItem)
    })
    .catch(error => {
        console.error(error)
    })




