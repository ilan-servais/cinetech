document.addEventListener('DOMContentLoaded', function() {
    const favoritesList = document.getElementById('favoritesList');

    // Récupérer les favoris depuis le localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Fonction pour créer une carte de film
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
        card.innerHTML = `
            <div class="card bg-black text-white">
                <a href="film-detail.html?id=${movie.id}"> <!-- Ajout de la balise <a> avec l'URL de détail du film -->
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <button class="btn btn-warning delete-btn bi-heart" data-item-id="${movie.id}"> Remove</button>
                </div>
            </div>
        `;
        return card;
    }


    // Fonction pour créer une carte de série
    function createSerieCard(serie) {
        const card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
        card.innerHTML = `
            <div class="card bg-black text-white">
                <a href="serie-detail.html?id=${serie.id}"> <!-- Ajout de la balise <a> avec l'URL de détail de la série -->
                    <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="card-img-top" alt="${serie.name}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">${serie.overview}</p>
                    <button class="btn btn-warning delete-btn bi-heart" data-item-id="${serie.id}"> Remove</button>
                </div>
            </div>
        `;
        return card;
    }

    // Parcourir les favoris et afficher les cartes correspondantes
    favorites.forEach(itemId => {
        fetch(`https://api.themoviedb.org/3/movie/${itemId}?api_key=57be7838f9d1d893350a3227c0e862a5`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(movie => {
                const card = createMovieCard(movie);
                favoritesList.appendChild(card);
            })
            .catch(error => console.error('Erreur lors de la récupération des détails du film :', error));
    });

    // Parcourir les favoris et afficher les cartes correspondantes pour les séries
    favorites.forEach(itemId => {
        fetch(`https://api.themoviedb.org/3/tv/${itemId}?api_key=57be7838f9d1d893350a3227c0e862a5`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(serie => {
                const card = createSerieCard(serie);
                favoritesList.appendChild(card);
            })
            .catch(error => console.error('Erreur lors de la récupération des détails de la série :', error));
    });

    // Gestion de la suppression d'un favori
    favoritesList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const itemId = event.target.dataset.itemId;
            removeFavorite(itemId);
            // Retirer la carte de la liste des favoris
            event.target.closest('.col-lg-3').remove();
        }
    });

    // Fonction pour supprimer un favori
    function removeFavorite(itemId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(itemId);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }
});
