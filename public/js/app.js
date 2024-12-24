// Fonction d'inscription
//pour les redirections il y aura des modifications plutard ce code sert uniquement de test
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost/projet-d-web/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.succes) {
            window.location.href = 'login.html'; // Rediriger vers la page de connexion après l'inscription
        } else {
            document.getElementById('error-message').textContent = data.erreur;
        }
    })
    .catch(error => {
        console.error('Erreur d\'inscription:', error);
        document.getElementById('error-message').textContent = 'Erreur lors de l\'inscription. Veuillez réessayer.';
    });
});


document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Données envoyées : ", { email, password }); // Log des données saisies

    fetch('http://localhost/projet-d-web/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
.then(response => response.json())
.then(data =>{
    if (data.succes) {
        window.location.href = '../CruciWeb/games/index.html'; // Redirection
    } else {
        document.getElementById('error-message').textContent = data.erreur; // Affichage de l'erreur
    }
})
.catch(error => {
    console.error("Erreur :", error); //débeugage
});
});

document.getElementById('logoutBtn')?.addEventListener('click',function(e){
    fetch('http://localhost/projet-d-web/api/logout',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
    })
    .then(response => {
        console.log("Statut de la réponse : ", response.status);
        return response.json(); // Parse la réponse en JSON
    })
    .then(data =>{
        console.log("Réponse JSON : ", data);
        if(data.succes){
            //redirection 
            window.location.href = '../../public/login.html';
        }else{
            console.log("deconnexion echoué");
        }
    })
    .catch(error => {
        console.error("Erreur :", error); //débeugage
    });

})