const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=57be7838f9d1d893350a3227c0e862a5";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau.');
        }
        return response.json();
    })
    .then(data => {
        const movies = data.results; // Liste de tous les films de l'API
        const imageBaseUrl = "https://image.tmdb.org/t/p/original";
        const imageContainer = document.getElementById('image-container');

        // Supprimer l'image existante si nécessaire
        imageContainer.innerHTML = '';

        // Parcourir la liste de films et créer des éléments d'image pour chaque film
        movies.forEach(movie => {
            const imagePath = movie.poster_path;
            const title = movie.title;
            const imageUrl = imageBaseUrl + imagePath;

            const movieImageElement = document.createElement('img');
            movieImageElement.src = imageUrl;
            movieImageElement.alt = title;
            imageContainer.appendChild(movieImageElement);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });
