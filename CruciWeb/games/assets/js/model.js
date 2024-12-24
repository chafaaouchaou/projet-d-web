// model.js
class GameModel {
    static fetchGames() {
        return fetch("http://localhost/projet-d-web/api/games")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            });
    }

    static fetchFilteredGames(niveau_difficulte, date_de_creation) {
        let url = "http://localhost/projet-d-web/api/games/filtered?"; // URL de l'API filtrée
        const params = [];

        if (niveau_difficulte) {
            params.push(`niveau_difficulte=${niveau_difficulte}`);
        }
        if (date_de_creation) {
            params.push(`date_de_creation=${date_de_creation}`);
        }

        // Ajouter les paramètres à l'URL
        url += params.join("&");

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            });
    }
}
