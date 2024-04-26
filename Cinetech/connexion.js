document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        // Récupérer les valeurs des champs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Vérifier si les champs ne sont pas vides
        if (email.trim() === '' || password.trim() === '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Enregistrer les données dans le stockage local
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // Rediriger vers une autre page (par exemple, la page d'accueil)
        window.location.href = 'accueil.html';
    });
});
