// Sélection de l'élément de formulaire de commentaire
const commentForm = document.getElementById('comment-form');

// Sélection de l'élément où les commentaires seront affichés
const commentSection = document.getElementById('comment-section');

// Fonction pour ajouter un nouveau commentaire à la section des commentaires
function addComment(comment) {
    // Créer un élément de commentaire
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Ajouter le contenu du commentaire
    const commentContent = document.createElement('p');
    commentContent.textContent = comment;
    commentElement.appendChild(commentContent);

    // Ajouter le commentaire à la section des commentaires
    commentSection.appendChild(commentElement);
}

// Gestion de la soumission du formulaire de commentaire
commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre

    // Récupérer le commentaire saisi par l'utilisateur
    const newComment = commentForm.querySelector('textarea').value;

    // Ajouter le commentaire à la section des commentaires
    addComment(newComment);

    // Réinitialiser le formulaire
    commentForm.reset();
});
