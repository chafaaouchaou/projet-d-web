import API_BASE_URL from '../../../../config.js';


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupérer les valeurs des champs
    const inputs = document.querySelectorAll('input');
    const [nom, prenom, email, motDePasse] = Array.from(inputs).map(input => input.value);

    // Créer l'objet à envoyer
    const data = {
        username: `${nom}${prenom}`, // Concaténation du nom et du prénom
        email: email,
        password: motDePasse
    };

    // Envoyer la requête POST
    fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Spécifie le format JSON
        },
        body: JSON.stringify(data) // Convertit l'objet en chaîne JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur: ${response.statusText}`);
        }
        return response.json();
    })
    .then(result => {
        // console.log(result); // Affiche le retour dans la console
        alert(result.succes); // Message utilisateur
        window.location.href = '/projet-d-web/CruciWeb/connection';

    })
    .catch(error => {
        console.error('Erreur lors de la requête:', error);
        alert('Une erreur est survenue lors de l’inscription.');
    });
});
