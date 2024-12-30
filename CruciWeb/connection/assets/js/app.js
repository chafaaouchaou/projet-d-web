import API_BASE_URL from '../../../../config.js';

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    const inputs = document.querySelectorAll('input');
    const email = inputs[0].value; // Récupère l'email
    const password = inputs[1].value; // Récupère le mot de passe

    // Corps de la requête
    const data = {
        email: email,
        password: password
    };

    try {
        // Envoi de la requête POST
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indique que les données sont en JSON
            },
            body: JSON.stringify(data) // Convertit les données en JSON
        });

        // Vérifie si la requête a réussi
        if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
        }

        // Récupère la réponse en JSON
        const result = await response.json();
        
        if (result.succes) {
            console.log(result.succes);
            alert("Connexion réussie : " + result.succes);
            window.location.href = '/projet-d-web/CruciWeb/';

            // Redirige vers une autre page si nécessaire
            // window.location.href = "/projet-d-web/dashboard";
        } else if (result.erreur) {
            alert("Erreur : " + result.erreur);
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error.message);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
});
