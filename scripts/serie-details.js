const apiUrl = "https://api.themoviedb.org/3/trending/tv/week?api_key=57be7838f9d1d893350a3227c0e862a5";
const tvDetails = document.getElementById("tv-details");

// Récupérer l'ID de la série à partir des paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const serieId = urlParams.get('id');

// Utilisez serieId pour obtenir les détails de la série

// Promise.all pour obtenir les détails de la série et les acteurs
Promise.all([
    fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json()),
    fetch(`https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json())
])
.then(([data, credits]) => {
    // code pour afficher les détails de la série et les acteurs
    const tvItem = document.createElement("div");
    tvItem.innerHTML = `
            <div id="tv-item">
            <h1>${data.name}</h1>
            <button id="addToFavoritesBtn" class="btn btn-outline-light me-2"><i class="bi bi-heart"></i></button>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
            <div id="tv-info">
                <p>${data.overview}</p>
                <p>First air date: ${data.first_air_date}</p>
                <p>Last air date: ${data.last_air_date}</p>
                <p>Number of seasons: ${data.number_of_seasons}</p>
                <p>Number of episodes: ${data.number_of_episodes}</p>
                <p>Genres: ${data.genres.map(genre => genre.name).join(', ')}</p>
                <p>Production companies: ${data.production_companies.map(company => company.name).join(', ')}</p>
                <p>Production countries: ${data.production_countries.map(country => country.name).join(', ')}</p>
                <p>Original language: ${data.original_language}</p>
                <p>Origin countries: ${data.origin_country}</p>
                <p>Popularity: ${data.popularity}</p>
                <p>Vote count: ${data.vote_count}</p>
                <p>Vote average: ${data.vote_average}</p>
                <p>Status: ${data.status}</p>
                <p>Type: ${data.type}</p>
                <p>Homepage: <a href="${data.homepage}" class="text-warning" target="_blank">${data.homepage}</a></p>
                <p>Original name: ${data.original_name}</p>
                <p>Tagline: ${data.tagline}</p>
                <p>Episode runtime: ${data.episode_run_time} minutes</p>
                <p>Networks: ${data.networks.map(network => network.name).join(', ')}</p>
            </div>
            <div id="tv-cast" class="d-flex justify-content-center">
                ${credits.cast.slice(0, 5).map(actor => `
                    <div class="actor text
                    -center">
                        <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}">
                        <p>${actor.name}</p>
                    </div>    
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    tvDetails.appendChild(tvItem);

    // Vérifier si la série est déjà dans les favoris et modifier l'icône en conséquence
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    if (favorites.includes(serieId)) {
        addToFavoritesBtn.classList.add('favorited');
    }

    // Gestion de l'ajout aux favoris depuis la page de détails de la série
    addToFavoritesBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addToFavorites(serieId);
        addToFavoritesBtn.classList.add('favorited');
    });
})
.catch(error => {
    console.error(error);
});

// Fonction pour ajouter un élément aux favoris
function addToFavorites(itemId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(itemId)) {
        favorites.push(itemId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
