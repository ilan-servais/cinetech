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
            <a href="#" id="addToFavoritesBtn" class="btn btn-outline-light me-2"><i class="bi bi-heart"></i></a>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
            <div id="tv-info">
                <h1>${data.name}</h1>
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
