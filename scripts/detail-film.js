const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=57be7838f9d1d893350a3227c0e862a5";
const tvDetails = document.getElementById("tv-details");

// Récupérer l'ID du film à partir des paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
let filmId = urlParams.get('id');

// Utilisez filmId pour obtenir les détails du film
Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json()),
    fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json())
])

.then(([data, credits]) => {
    // code pour afficher les détails du film et les acteurs
    const tvItem = document.createElement("div");
    tvItem.innerHTML = `
        <div id="tv-item">
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
            <div id="tv-info">
                <h1>${data.title}</h1>
                <p>${data.overview}</p>
                <p>Viewers ratings: ${data.vote_average}</p>
                <h2>Cast</h2>
                <div id="tv-cast">
                ${credits.cast.slice(0, 5).map(actor => `
                    <div class="actor">
                        <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}">
                        <p>${actor.name}</p>
                    </div>
                `).join('')}
            </div>
            </div>
            
        </div>
    `;
    tvDetails.appendChild(tvItem);
})
    .catch(error => {
        console.error(error);
    });
