const apiUrl = "https://api.themoviedb.org/3/trending/tv/week?api_key=57be7838f9d1d893350a3227c0e862a5"
const tvList = document.getElementById("tv-list")
const tvCard = document.getElementById("tv-card")

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(tv => {
            const tvItem = document.createElement("div")
            tvItem.innerHTML = `
                <div id="tv-details">
                    <a href="/cinetech/html/series-detail.html?id=${tv.id}">
                        <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}">
                    </a>
                </div>
            `
            tvDetails.appendChild(tvItem)
        })
    })
    .catch(error => {
        console.error(error)
    })
