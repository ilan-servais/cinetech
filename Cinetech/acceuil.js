const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=57be7838f9d1d893350a3227c0e862a5";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau.');
        }
        return response.json();
    })
    .then(data => {
        const movies = data.results;
        const imageBaseUrl = "https://image.tmdb.org/t/p/original";
        const filmContainer = document.querySelector('.film-container');

        filmContainer.innerHTML = '';

        movies.forEach(movie => {
            const imagePath = movie.poster_path;
            const title = movie.title;
            const imageUrl = imageBaseUrl + imagePath;

            const movieImageElement = document.createElement('img');
            movieImageElement.src = imageUrl;
            movieImageElement.alt = title;

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            imageContainer.appendChild(movieImageElement);

            filmContainer.appendChild(imageContainer);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });

