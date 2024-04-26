document.addEventListener('DOMContentLoaded', function() {
    const favorisButton = document.getElementById('favorisBtn');
    const logoutButton = document.getElementById('logoutBtn');
    const loginButton = document.getElementById('loginBtn');
    const signupButton = document.getElementById('signupBtn');

    // Ajouter la fonctionnalité de déconnexion au bouton Déconnexion
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Supprimer les données de session
            sessionStorage.removeItem('username');
            // Rediriger vers la page d'accueil après la déconnexion
            window.location.href = 'index.html';
        });
    }

    // Vérifier si l'utilisateur est connecté
    const username = sessionStorage.getItem('username');

    if (username) {
        // Si l'utilisateur est connecté, afficher les boutons Favoris et Déconnexion
        if (favorisButton) favorisButton.style.display = 'inline-block';
        if (logoutButton) logoutButton.style.display = 'inline-block';

        // Cacher les boutons Login et Sign-up
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
    } else {
        // Si l'utilisateur n'est pas connecté, afficher les boutons Login et Sign-up
        if (loginButton) loginButton.style.display = 'inline-block';
        if (signupButton) signupButton.style.display = 'inline-block';

        // Cacher les boutons Favoris et Déconnexion
        if (favorisButton) favorisButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
    }
});
