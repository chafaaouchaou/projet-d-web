
// Fonction pour vérifier si un cookie PHPSESSID existe
function checkSession() {
    // Vérifier si le cookie PHPSESSID est présent
    let sessionCookie = document.cookie.split(';').some((item) => item.trim().startsWith('PHPSESSID='));

    if (sessionCookie) {
        // Si le cookie de session existe, afficher le lien Logout
        document.getElementById('logout-link').classList.remove('hidden');
    } else {
        // Sinon, afficher les liens Login et Register
        document.getElementById('login-link').classList.remove('hidden');
        document.getElementById('register-link').classList.remove('hidden');
    }
}

// Fonction pour déconnecter l'utilisateur
// Fonction pour déconnecter l'utilisateur
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        // Suppression du cookie PHPSESSID (ou tout autre cookie de session)


        // Effectuer une requête POST pour la déconnexion
        fetch('http://192.168.76.76/projet-d-web/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.succes) {
                alert(data.succes); // Afficher un message de succès
                // Rediriger après la déconnexion
                document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.hostname;
                document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                window.location.href = '/projet-d-web/CruciWeb/';
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            alert('Logout failed');
        });
    }
}



// Vérifier l'état de la session au chargement de la page
checkSession();
