document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le formulaire de se soumettre normalement

            // Récupérer les valeurs des champs
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Récupérer les informations d'inscription à partir du stockage local
            const registeredUsername = localStorage.getItem('pseudo'); // Utiliser 'pseudo' au lieu de 'username'
            const registeredPassword = localStorage.getItem('password');

            // Vérifier si les champs ne sont pas vides
            if (username.trim() === '' || password.trim() === '') {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            // Vérifier les informations de connexion
            if (username === registeredUsername && password === registeredPassword) {
                // Enregistrer l'utilisateur connecté dans la session
                sessionStorage.setItem('username', username);

                // Rediriger vers la page d'accueil si les informations sont valides
                window.location.href = 'index.html';
            } else {
                // Afficher un message d'erreur si les informations sont incorrectes
                alert('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        });
    }
});
