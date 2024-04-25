const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=57be7838f9d1d893350a3227c0e862a5";
const tvDetails = document.getElementById("tv-details");

// Récupérer l'ID du film à partir des paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id');

// Utilisez filmId pour obtenir les détails du film
fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=57be7838f9d1d893350a3227c0e862a5`)
    .then(response => response.json())
    .then(data => {
        // Code pour afficher les détails du film
        const tvItem = document.createElement("div");
        tvItem.innerHTML = `
            <div id="tv-item">
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.name}">
                <div id="tv-info">
                    <h1>${data.title}</h1>
                    <p>${data.overview}</p>
                    <p>Viewers note: ${data.vote_average}</p>
                </div>
            </div>
        `;
        tvDetails.appendChild(tvItem);
    })
    .catch(error => {
        console.error(error);
    });
