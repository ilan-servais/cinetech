// Sélection de l'élément de formulaire de commentaire
const commentForm = document.getElementById('comment-form');

// Sélection de l'élément où les commentaires seront affichés
const commentSection = document.getElementById('comment-container');

// Fonction pour ajouter un nouveau commentaire à la section des commentaires
function addComment(name, message) {
    // Créer un élément de commentaire
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Ajouter le contenu du commentaire
    const commentContent = document.createElement('div');
    commentContent.innerHTML = `
        <h4>${name}</h4>
        <p>${message}</p>
    `;
    commentElement.appendChild(commentContent);

    // Ajouter le commentaire à la section des commentaires
    commentSection.appendChild(commentElement);
}

// Gestion de la soumission du formulaire de commentaire
commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre

    // Récupérer les valeurs saisies par l'utilisateur
    const name = commentForm.querySelector('#name').value;
    const message = commentForm.querySelector('#message').value;

    // Ajouter le commentaire à la section des commentaires
    addComment(name, message);

    // Réinitialiser le formulaire
    commentForm.reset();

    // Enregistrer le commentaire dans le localStorage avec un nom aléatoire
    const randomName = `user_${Math.floor(Math.random() * 1000000)}`;
    const commentData = { name, message };
    localStorage.setItem(randomName, JSON.stringify(commentData));
});

// Charger les commentaires depuis le localStorage lors du chargement de la page
window.addEventListener('load', function() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            const commentData = JSON.parse(localStorage.getItem(key));
            addComment(commentData.name, commentData.message);
        }
    }
});

const urlParam = new URLSearchParams(window.location.search);
const filmId = urlParam.get('id');

function showReviewFromApi() {
    fetch(`https://api.themoviedb.org/3/tv/${filmId}/reviews?language=en-US&page=1&api_key=57be7838f9d1d893350a3227c0e862a5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Code to display the reviews
            data.results.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `
                    <h4>${review.author}</h4>
                    <p>${review.content}</p>
                `;
                commentSection.appendChild(reviewElement);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Call the function with a movie id
showReviewFromApi();