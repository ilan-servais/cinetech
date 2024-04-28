// Encapsuler le code dans une fonction anonyme
(function() {
    const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=57be7838f9d1d893350a3227c0e862a5";
    const tvDetails = document.getElementById("tv-details");

    // Récupérer l'ID du film à partir des paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search);
    let filmId = urlParams.get('id');

    // Utiliser filmId pour obtenir les détails du film
    Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json()),
        fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=57be7838f9d1d893350a3227c0e862a5`).then(response => response.json())
    ])
    .then(([data, credits, videos]) => {
        // Vérifier si des vidéos sont disponibles avant d'ajouter la bande-annonce
        let trailerHtml = '';
        if (data.videos && data.videos.results && data.videos.results.length > 0) {
            trailerHtml = `
                <h2>Trailer</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${data.videos.results[0].key}" title="${data.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }

        // code pour afficher les détails du film et les acteurs
        const tvItem = document.createElement("div");
        tvItem.innerHTML = `
            <div id="tv-item">
                <h1>${data.title}</h1>
                <button id="addToFavoritesBtn" class="btn btn-outline-light me-2"><i class="bi bi-heart"></i></button>
                <div id="tv-info">
                    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
                    
                    <div class="overview-container">
                        <p>${data.overview}</p>
                    </div>

                    <p>Status : ${data.status}</p>
                    <p>Release Date : ${data.release_date}</p>
                    <p>Runtime : ${data.runtime} minutes</p>
                    <p>Language : ${data.original_language}</p>
                    <p>Genres : ${data.genres.map(genre => genre.name).join(', ')}</p>
                    <p>Production Companies : ${data.production_companies.map(company => company.name).join(', ')}</p>
                    <p>Production Countries : ${data.production_countries.map(country => country.name).join(', ')}</p>
                    <p>Revenue : $${data.revenue.toLocaleString()}</p>
                    <p>Budget : $${data.budget.toLocaleString()}</p>
                    <p>Tagline : ${data.tagline}</p>
                    <p>Popularity : ${data.popularity}</p>
                    <p>Vote Count : ${data.vote_count}</p>
                    <p>Vote Average : ${data.vote_average}</p>
                    <p>Adult : ${data.adult}</p>
                    <p>Homepage : <a href="${data.homepage}" class="text-warning" target="_blank">${data.homepage}</a></p>
                    <p>Original Title : ${data.original_title}</p>
                    <p>Tagline : ${data.tagline}</p>
                    
                    <h2>Trailer</h2>
                    ${trailerHtml}
                         
                    <h2>Cast</h2>
                    <div id="tv-cast" class="d-flex justify-content-center">
                        ${credits.cast.slice(0, 5).map(actor => `
                    <div class="actor text-center">
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
