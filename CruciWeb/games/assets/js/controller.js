// controller.js
class GameController {
    constructor(view) {
        this.view = view;
    }

    loadGames() {
        GameModel.fetchGames()
            .then(games => this.view.renderGames(games))
            .catch(error => this.view.showError(error.message));
    }

    handleGameClick(event) {
        const gameDiv = event.target.closest(".game");
        const gameId = gameDiv ? gameDiv.dataset.id : null;
        if (gameId) {
            window.location.href = `http://localhost/projet-d-web/CruciWeb/game/?id=${gameId}`;
        }
    }

    handleFilterGames(event) {
        // Empêcher le rechargement de la page
        event.preventDefault();

        // Récupérer les valeurs des filtres
        const niveau_difficulte = document.getElementById("niveau_difficulte").value;
        const date_de_creation = document.getElementById("date_de_creation").value;

        // Vérification des valeurs de filtre
        console.log("Filtres appliqués : Niveau de difficulté:", niveau_difficulte, "Date de création:", date_de_creation);

        // Construire l'URL de la requête API avec les filtres
        let url = "http://localhost/projet-d-web/api/games/filtered?";
        const params = [];

        if (niveau_difficulte) {
            params.push(`niveau_difficulte=${niveau_difficulte}`);
        }
        if (date_de_creation) {
            params.push(`date_de_creation=${date_de_creation}`);
        }

        // Ajouter un timestamp pour forcer un nouveau chargement (éviter le cache)
        params.push(`_=${new Date().getTime()}`);

        // Ajouter les paramètres à l'URL
        url += params.join("&");
        console.log("URL générée pour filtrer :", url);

        // Effectuer la requête API avec l'URL mise à jour
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(games => {
                console.log("Jeux filtrés reçus : ", games);  // Afficher les jeux reçus dans la console
                this.view.renderGames(games);  // Afficher les jeux filtrés
            })
            .catch(error => {
                console.error("Erreur de filtrage :", error);
                this.view.showError(error.message);  // Afficher les erreurs éventuelles
            });
    }
    
}
