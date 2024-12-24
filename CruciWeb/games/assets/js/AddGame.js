document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-grid-form');
    console.log(form); // Vérifie si le formulaire est trouvé dans le DOM

    if (form) {
        form.addEventListener('submit', async function (event) {
            console.log("Soumission du formulaire capturée"); // message de debugage
            event.preventDefault(); 
            // Récupérer les données du formulaire
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            data['casesNoire'] = data['casesNoire'].split(' ').filter(Boolean); // Vérifier et nettoyer les casesNoire
            data['defHorizontales'] = data['defHorizontales'].split(',').map(item => item.trim()); // Traiter les définitions horizontales
            data['defVerticales'] = data['defVerticales'].split(',').map(item => item.trim()); // Traiter les définitions verticales
            data['lignes'] = parseInt(data['lignes']);
            data['colonnes'] = parseInt(data['colonnes']);
            
            // Afficher les données nettoyées dans la console avant de les envoyer
            console.log("Données envoyées : ", JSON.stringify(data, null, 2));

            try {
                // Envoyer les données via une requête POST
                const response = await fetch('http://localhost/projet-d-web/api/addGrid', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data) // Transforme les données en JSON
                });

                // Vérifie la réponse brute avant de tenter de la convertir en JSON
                console.log('Réponse brute du serveur:', response);

                // Si la réponse n'est pas OK, affiche un message d'erreur
                if (!response.ok) {
                    console.error("Erreur de réseau : ", response.statusText);
                    document.getElementById('message').innerHTML = '<p style="color: red;">Erreur de connexion au serveur.</p>';
                    return;
                }

                // Lire et afficher la réponse du serveur
                const result = await response.json();
                console.log('Réponse JSON du serveur:', result);

                // Vérifier la réponse et afficher un message approprié
                const messageContainer = document.getElementById('message');
                if (result.succes) {
                    messageContainer.innerHTML = `<p style="color: green;">${result.succes}</p>`;
                } else {
                    console.error("Erreur de réponse du serveur : ", result);  // Debugger
                    messageContainer.innerHTML = `<p style="color: red;">${result.erreur || 'Une erreur est survenue.'}</p>`;
                }

            } catch (error) {
                console.error('Erreur lors de la requête :', error);
                document.getElementById('message').innerHTML = '<p style="color: red;">Erreur de connexion au serveur.</p>';
            }
        });
    }
});
