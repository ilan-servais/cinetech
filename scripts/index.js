document.addEventListener('DOMContentLoaded', function() {
    // Sélectionnez toutes les icônes de favoris
    const favoriteIcons = document.querySelectorAll('.favorite-icon');

    // Mise à jour des icônes de favoris lors du chargement de la page
    updateFavoriteIcons();

    // Gestion de l'ajout aux favoris
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('favorite-icon')) {
            event.stopPropagation();
            event.preventDefault();

            const itemId = event.target.dataset.itemId;
            addToFavorites(itemId);
        }
    });

    // Fonction pour mettre à jour les icônes de favoris lors du chargement de la page
    function updateFavoriteIcons() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoriteIcons.forEach(icon => {
            if (favorites.includes(icon.dataset.itemId)) {
                icon.classList.add('favorited');
            } else {
                icon.classList.remove('favorited'); // Assurez-vous que la classe favorited est retirée si l'élément n'est pas dans les favoris
            }
        });
    }

    // Fonction pour ajouter un élément aux favoris
    function addToFavorites(itemId) {
        // Récupérer la liste de favoris depuis le localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Vérifier si l'élément est déjà dans la liste de favoris
        if (!favorites.includes(itemId)) {
            // Ajouter l'élément à la liste de favoris
            favorites.push(itemId);

            // Mettre à jour le localStorage avec la nouvelle liste de favoris
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Mettre à jour visuellement l'icône de favoris pour indiquer qu'il a été ajouté
            document.querySelector(`.favorite-icon[data-item-id="${itemId}"]`).classList.add('favorited');

            // Mettre à jour toutes les icônes de favoris sur la page
            updateFavoriteIcons();
        }
    }

    // Fonction pour créer une carte de film
    function createMovieCard(movie) {
        const movieLink = document.createElement('a');
        movieLink.href = `film-detail.html?id=${movie.id}`;
        movieLink.classList.add('card-link');
        
        const movieCard = document.createElement('div');
        movieCard.classList.add('mb-4');
        movieCard.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <i class="bi bi-heart favorite-icon" data-item-id="${movie.id}" title="Add to Favorites"></i>
                </div>
            </div>
        `;
        
        movieLink.appendChild(movieCard);

        // Vérifier si le film est déjà dans les favoris
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(movie.id)) {
            // Si le film est déjà dans les favoris, changer la couleur de l'icône du bouton
            movieCard.querySelector('.favorite-icon').classList.add('favorited');
        }

        return movieLink;
    }

    // Fonction pour créer une carte de série
    function createSerieCard(serie) {
        const serieLink = document.createElement('a');
        serieLink.href = `serie-detail.html?id=${serie.id}`;
        serieLink.classList.add('card-link');
        
        const serieCard = document.createElement('div');
        serieCard.classList.add('mb-4');
        serieCard.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="card-img-top" alt="${serie.name}">
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">${serie.overview}</p>
                    <i class="bi bi-heart favorite-icon" data-item-id="${serie.id}" title="Add to Favorites"></i>
                </div>
            </div>
        `;
        
        serieLink.appendChild(serieCard);
        return serieLink;
    }

    // Récupérer les tendances de films
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=57be7838f9d1d893350a3227c0e862a5')
        .then(response => response.json())
        .then(data => {
            const trendingMoviesList = document.getElementById('trendingMoviesList');
            
            // Calculer le nombre total de films
            const totalMovies = data.results.length;
            
            // Diviser le nombre total de films par deux pour obtenir le nombre de films par colonne
            const moviesPerColumn = Math.ceil(totalMovies / 2);
            
            // Diviser les films en deux groupes
            const moviesGroup1 = data.results.slice(0, moviesPerColumn);
            const moviesGroup2 = data.results.slice(moviesPerColumn);
            
            // Créer une colonne pour chaque groupe de films
            const moviesColumn1 = document.createElement('div');
            moviesColumn1.classList.add('col-lg-6', 'col-md-6', 'col-sm-6');
            const moviesColumn2 = document.createElement('div');
            moviesColumn2.classList.add('col-lg-6', 'col-md-6', 'col-sm-6');
            
            // Ajouter les films du premier groupe à la première colonne
            moviesGroup1.forEach(movie => {
                const movieCard = createMovieCard(movie);
                moviesColumn1.appendChild(movieCard);
            });
            
            // Ajouter les films du deuxième groupe à la deuxième colonne
            moviesGroup2.forEach(movie => {
                const movieCard = createMovieCard(movie);
                moviesColumn2.appendChild(movieCard);
            });
            
            // Ajouter les colonnes à la liste des tendances des films
            trendingMoviesList.appendChild(moviesColumn1);
            trendingMoviesList.appendChild(moviesColumn2);
        })
        .catch(error => console.error('Erreur lors de la récupération des tendances de films :', error));

    // Récupérer les tendances de séries
    fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=57be7838f9d1d893350a3227c0e862a5')
        .then(response => response.json())
        .then(data => {
            const trendingSeriesList = document.getElementById('trendingSeriesList');
            
            // Calculer le nombre total de séries
            const totalSeries = data.results.length;
            
            // Diviser le nombre total de séries par deux pour obtenir le nombre de séries par colonne
            const seriesPerColumn = Math.ceil(totalSeries / 2);
            
            // Diviser les séries en deux groupes
            const seriesGroup1 = data.results.slice(0, seriesPerColumn);
            const seriesGroup2 = data.results.slice(seriesPerColumn);
            
            // Créer une colonne pour chaque groupe de séries
            const seriesColumn1 = document.createElement('div');
            seriesColumn1.classList.add('col-lg-6', 'col-md-6', 'col-sm-6');
            const seriesColumn2 = document.createElement('div');
            seriesColumn2.classList.add('col-lg-6', 'col-md-6', 'col-sm-6');
            
            // Ajouter les séries du premier groupe à la première colonne
            seriesGroup1.forEach(serie => {
                const serieCard = createSerieCard(serie);
                seriesColumn1.appendChild(serieCard);
            });
            
            // Ajouter les séries du deuxième groupe à la deuxième colonne
            seriesGroup2.forEach(serie => {
                const serieCard = createSerieCard(serie);
                seriesColumn2.appendChild(serieCard);
            });
            
            // Ajouter les colonnes à la liste des tendances des séries
            trendingSeriesList.appendChild(seriesColumn1);
            trendingSeriesList.appendChild(seriesColumn2);
        })
        .catch(error => console.error('Erreur lors de la récupération des tendances de séries :', error));
});
