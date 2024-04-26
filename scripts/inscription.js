document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le formulaire de se soumettre normalement

            // Récupérer les valeurs des champs
            const pseudo = document.getElementById('pseudo').value;
            const password = document.getElementById('password').value;

            // Enregistrer les données dans le localStorage
            localStorage.setItem('pseudo', pseudo);
            localStorage.setItem('password', password);

            // Rediriger vers une autre page (par exemple, la page de connexion)
            window.location.href = 'connexion.html';
        });
    } else {
        // Logique de connexion si le formulaire de connexion est présent (pas nécessaire dans le fichier d'inscription)
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Empêche le formulaire de se soumettre normalement

                // Récupérer les valeurs des champs
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                // Récupérer les informations d'inscription à partir du stockage local
                const registeredPseudo = localStorage.getItem('pseudo');
                const registeredPassword = localStorage.getItem('password');

                // Vérifier si les champs ne sont pas vides
                if (email.trim() === '' || password.trim() === '') {
                    alert('Veuillez remplir tous les champs.');
                    return;
                }

                // Vérifier les informations de connexion
                if (email === registeredPseudo && password === registeredPassword) {
                    // Rediriger vers la page d'accueil si les informations sont valides
                    window.location.href = 'accueil.html';
                } else {
                    // Afficher un message d'erreur si les informations sont incorrectes
                    alert('Nom d\'utilisateur ou mot de passe incorrect.');
                }
            });
        }
    }
});
