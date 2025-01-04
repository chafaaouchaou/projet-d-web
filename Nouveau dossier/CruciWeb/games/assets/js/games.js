
import API_BASE_URL from '../../../../config.js';



document.addEventListener("DOMContentLoaded", function () {
    const gamesContainer = document.getElementById("games-container");

    fetch(`${API_BASE_URL}/games`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            
            return response.json();
        })
        .then(games => {
            
            gamesContainer.innerHTML = ""; // Clear loading message
            console.log(games);
            
            games.forEach(game => {
                // Create the game container
                const gameDiv = document.createElement("div");
                gameDiv.classList.add("game");
                gameDiv.dataset.id = game.id; // Store the game ID as a dataset attribute
            
                // Create and add the image
                const gameImage = document.createElement("img");
                gameImage.src = "assets/images/card-image.png";
                gameImage.alt = `${game.name} Image`;
            
                // Create and add the title
                const gameTitle = document.createElement("h2");
                gameTitle.textContent = game.name;
            
                // Create and add the description
                const gameDescription = document.createElement("p");
                gameDescription.textContent = game.description;
            
                // Append elements to the game container
                gameDiv.appendChild(gameImage);
                const gametext = document.createElement("div");
                
                gametext.appendChild(gameTitle);
                gametext.appendChild(gameDescription);
                gameDiv.appendChild(gametext);
                gametext.classList.add("gametext");
                // Add click event to redirect to game page
                gameDiv.addEventListener("click", () => {
                    const gameId = gameDiv.dataset.id;
                    window.location.href = `/projet-d-web/CruciWeb/game?id=${gameId}`;
                });
            
                // Append the game container to the grid
                gamesContainer.appendChild(gameDiv);
            });
            
        })
        .catch(error => {
            gamesContainer.innerHTML = `<p>Error loading games: ${error.message}</p>`;
        });
});

// //////////////////////////////////////

// document.addEventListener("DOMContentLoaded", () => {
//     const levelSelect = document.getElementById("level-select");
//     const dateSelect = document.getElementById("date-select");

//     levelSelect.addEventListener("change", () => {
//         console.log("Level Filter Selected:", levelSelect.value);
//     });

//     dateSelect.addEventListener("change", () => {
//         console.log("Date Filter Selected:", dateSelect.value);
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const levelSelect = document.getElementById("level-select");
    const dateSelect = document.getElementById("date-select");
    const gamesContainer = document.getElementById("games-container");

    // Fonction pour filtrer les jeux
    const handleFilterGames = () => {
        // Récupérer les valeurs des filtres
        const niveau_difficulte = levelSelect.value;
        const date_de_creation = dateSelect.value;

        // Construire l'URL de la requête API avec les filtres
        let url = "http://localhost/projet-d-web/api/games/filtered?";
        const params = [];

        if (niveau_difficulte) {
            params.push(`niveau_difficulte=${niveau_difficulte}`);
        }
        if (date_de_creation) {
            params.push(`date_de_creation=${date_de_creation}`);
        }

        // Ajouter un timestamp pour éviter le cache
        params.push(`_=${new Date().getTime()}`);

        // Ajouter les paramètres à l'URL
        url += params.join("&");

        // Effectuer la requête API avec l'URL mise à jour
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(games => {
                // Mettre à jour l'affichage des jeux
                gamesContainer.innerHTML = ""; // Effacer le contenu précédent
                console.log(games);

                games.forEach(game => {
                    // Créer le conteneur du jeu
                    const gameDiv = document.createElement("div");
                    gameDiv.classList.add("game");
                    gameDiv.dataset.id = game.id; // Stocker l'ID du jeu comme attribut de dataset

                    // Créer et ajouter l'image
                    const gameImage = document.createElement("img");
                    gameImage.src = "assets/images/card-image.png";
                    gameImage.alt = `${game.name} Image`;

                    // Créer et ajouter le titre
                    const gameTitle = document.createElement("h2");
                    gameTitle.textContent = game.name;

                    // Créer et ajouter la description
                    const gameDescription = document.createElement("p");
                    gameDescription.textContent = game.description;

                    // Ajouter les éléments au conteneur du jeu
                    gameDiv.appendChild(gameImage);
                    const gametext = document.createElement("div");

                    gametext.appendChild(gameTitle);
                    gametext.appendChild(gameDescription);
                    gameDiv.appendChild(gametext);
                    gametext.classList.add("gametext");

                    // Ajouter un événement au clic pour rediriger vers la page du jeu
                    gameDiv.addEventListener("click", () => {
                        const gameId = gameDiv.dataset.id;
                        window.location.href = `/projet-d-web/CruciWeb/game?id=${gameId}`;
                    });

                    // Ajouter le conteneur du jeu au grid
                    gamesContainer.appendChild(gameDiv);
                });
            })
            .catch(error => {
                gamesContainer.innerHTML = `<p>Error loading games: ${error.message}</p>`;
            });
    };

    // Ajouter les écouteurs d'événements pour les changements de filtres
    levelSelect.addEventListener("change", handleFilterGames);
    dateSelect.addEventListener("change", handleFilterGames);
});


// Ce lien est bien : 
// http://localhost/projet-d-web/api/games/filtered?niveau_difficulte=d%C3%A9butant&_=1735937173977