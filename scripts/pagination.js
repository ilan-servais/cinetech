const trendingList = document.getElementById('trending-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const tvList = document.getElementById("tv-list");
const tvCard = document.getElementById("tv-card");

let currentPage = 1;

// Fonction pour récupérer les films et séries en tendance
function getTrendingMedia(page, searchQuery) {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTE4YWU5MDVhNjllODBjOTFhM2Q3MTk4NjU2OGZjMSIsInN1YiI6IjY2MjhlMjU3Mzk1NDlhMDEzMjAwZTk5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wxbWEyL7ufBR0HZGs_OWrKtzO8OQ4OldlgywEpVkofs';
    const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=5a18ae905a69e80c91a3d71986568fc1&query=${searchQuery}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

// Fonction pour afficher les films et séries en tendance
function displayTrendingMedia(media) {
    trendingList.innerHTML = '';

    media.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Ajouter le titre de l'élément à la carte
        const title = document.createElement('h2');
        title.textContent = item.title || item.name || 'Titre non disponible';
        card.appendChild(title);

        // Ajouter une image de fond à la carte si disponible
        if (item.backdrop_path) {
            const backdropUrl = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
            card.style.backgroundImage = `url('${backdropUrl}')`;
        }

        trendingList.appendChild(card);
    });
}

// Gestion du clic sur le bouton "Précédent"
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
});

// Gestion du clic sur le bouton "Suivant"
nextPageBtn.addEventListener('click', () => {
    currentPage++;
    updatePage();
});

// Fonction pour mettre à jour la page en fonction du numéro de page actuel
function updatePage() {
    getTrendingMedia(currentPage)
        .then(data => {
            displayTrendingMedia(data.results);
        });
}

// Charger la première page de films et séries en tendance au chargement de la page
updatePage();
