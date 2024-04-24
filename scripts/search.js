// Sélection de l'élément de saisie de la barre de recherche
const searchInput = document.getElementById('search-input');

// Sélection de la section pour afficher les résultats de recherche
const searchResultsSection = document.getElementById('search-results');

// Fonction pour obtenir les suggestions de recherche
function getSearchSuggestions(searchQuery) {
    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=5a18ae905a69e80c91a3d71986568fc1&query=${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la recherche : ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.results) {
                const titles = data.results.map(result => {
                    if (result.media_type === 'movie' || result.media_type === 'tv') {
                        return result.title || result.name;
                    } else if (result.media_type === 'person') {
                        return result.name;
                    } else {
                        return '';
                    }
                });
                return titles.filter(title => title !== '');
            } else {
                return [];
            }
        })
        .catch(error => {
            console.error('Erreur lors de la recherche :', error);
            return [];
        });
}

// Fonction pour afficher les suggestions de recherche
function displaySearchSuggestions(suggestions) {
    console.log('Suggestions de recherche :', suggestions);
    // Implémentez la logique pour afficher les suggestions de recherche dans l'autocomplétion
}

// Fonction pour afficher les résultats de recherche
function displaySearchResults(results) {
    // Supprimer les cartes de résultats existantes
    searchResultsSection.innerHTML = '';

    // Parcourir les résultats et créer une carte pour chaque résultat
    results.forEach(result => {
        // Créer une carte pour le résultat
        const card = document.createElement('div');
        card.classList.add('card');

        // Créer un lien autour de la carte
        const link = document.createElement('a');
        if (result.media_type === 'movie') {
            // Lien vers la page de détails des films avec l'ID du film en tant que paramètre de requête
            link.href = `http://127.0.0.1:5500/film-detail.html?id=${result.id}`;
        } else if (result.media_type === 'tv') {
            // Lien vers la page de détails des séries avec l'ID de la série en tant que paramètre de requête
            link.href = `http://127.0.0.1:5500/serie-detail.html?id=${result.id}`;
        }
        link.appendChild(card);

        // Ajouter le titre du résultat à la carte
        const title = document.createElement('h2');
        title.textContent = result.title || result.name || 'Titre non disponible';
        card.appendChild(title);

        // Ajouter une image de fond à la carte si disponible
        if (result.backdrop_path) {
            const backdropUrl = `https://image.tmdb.org/t/p/w500${result.backdrop_path}`;
            card.style.backgroundImage = `url('${backdropUrl}')`;
        }

        // Ajouter le lien à la section des résultats
        searchResultsSection.appendChild(link);
    });
}

// Sélection de l'élément du formulaire de recherche
const searchForm = document.getElementById('search-form');

// Gestion de la saisie de l'utilisateur
searchInput.addEventListener('input', function() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    console.log('Recherche :', searchQuery);

    // Vérifier si la longueur de la chaîne de recherche est supérieure à 0
    if (searchQuery.length > 0) {
        // Simuler la soumission du formulaire
        searchForm.dispatchEvent(new Event('submit'));
    } else {
        // Si la chaîne de recherche est vide, simuler une seule fois la soumission du formulaire pour "nettoyer" le contenu
        searchForm.dispatchEvent(new Event('submit'));
    }
});

// Gestion de la soumission du formulaire de recherche
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre

    const searchQuery = searchInput.value.trim();
    console.log('Recherche :', searchQuery);

    // Envoyer une requête de recherche à l'API TMDb avec la clé API incluse
    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=5a18ae905a69e80c91a3d71986568fc1&query=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            // Traiter les résultats de la recherche et afficher les films correspondants sur la page
            console.log('Résultats de la recherche :', data.results);
            // Afficher les résultats sur la page
            displaySearchResults(data.results);
        })
        .catch(error => {
            console.error('Erreur lors de la recherche :', error);
        });
});
