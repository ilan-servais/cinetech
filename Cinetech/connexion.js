document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        // Récupérer les valeurs des champs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Récupérer les informations d'inscription à partir du stockage local
        const registeredEmail = localStorage.getItem('email');
        const registeredPassword = localStorage.getItem('password');

        // Vérifier si les champs ne sont pas vides
        if (email.trim() === '' || password.trim() === '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Vérifier les informations de connexion
        if (email === registeredEmail && password === registeredPassword) {
            // Rediriger vers la page d'accueil si les informations sont valides
            window.location.href = 'acceuil.html';
        } else {
            // Afficher un message d'erreur si les informations sont incorrectes
            alert('Adresse e-mail ou mot de passe incorrect.');
        }
    });
});
