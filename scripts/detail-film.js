// Encapsuler le code dans une fonction anonyme
(function() {
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
                <button id="addToFavoritesBtn" class="btn btn-outline-light me-2"><i class="bi bi-heart"></i></button>
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
                <div id="tv-info">
                    <h1>${data.title}</h1>
                    <p>${data.overview}</p>
                    <p>Viewers ratings: ${data.vote_average}</p>
                    <h2>Cast</h2>
                    <div id="tv-cast" >
                        ${credits.cast.slice(0, 5).map(actor => `
                            <div id="actor">
                                <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}">
                                <p>${actor.name}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        tvDetails.appendChild(tvItem);

        // Vérifier si le film est déjà dans les favoris
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
        if (favorites.includes(filmId)) {
            // Si le film est déjà dans les favoris, changer la couleur de l'icône du bouton
            addToFavoritesBtn.classList.add('favorited');
        }

        // Ajouter un gestionnaire d'événements au bouton "Add to Favorites"
        addToFavoritesBtn.addEventListener('click', function() {
            addToFavorites(filmId);
        });
    })
    .catch(error => {
        console.error(error);
    });

    // Fonction pour ajouter un film aux favoris
    function addToFavorites(filmId) {
        // Récupérer la liste de favoris depuis le localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Vérifier si le film est déjà dans la liste de favoris
        if (!favorites.includes(filmId)) {
            // Ajouter le film à la liste de favoris
            favorites.push(filmId);

            // Mettre à jour le localStorage avec la nouvelle liste de favoris
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Modifier la couleur de l'icône du bouton pour indiquer qu'il a été ajouté aux favoris
            document.getElementById('addToFavoritesBtn').classList.add('favorited');

            // Afficher un message dans la console pour le débogage
            console.log("Film ajouté aux favoris :", filmId);
        }
    }
})();
