
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

document.addEventListener("DOMContentLoaded", () => {
    const levelSelect = document.getElementById("level-select");
    const dateSelect = document.getElementById("date-select");

    levelSelect.addEventListener("change", () => {
        console.log("Level Filter Selected:", levelSelect.value);
    });

    dateSelect.addEventListener("change", () => {
        console.log("Date Filter Selected:", dateSelect.value);
    });
});
