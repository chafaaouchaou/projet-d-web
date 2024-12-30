document.addEventListener("DOMContentLoaded", () => {
    const gamesListContainer = document.querySelector(".games-list");

    // Fetch saved games from the API
    fetch("http://localhost/projet-d-web/api/getSavedGames")
        .then(response => response.json())
        .then(games => {
            gamesListContainer.innerHTML = ''; // Clear existing content
            console.log(games);
            
            games.forEach(game => {
                const gameItem = document.createElement("div");
                gameItem.classList.add("game-item");
                gameItem.classList.add("clicabale");

                gameItem.innerHTML = `
                    <img src="assets/images/card-image.png" alt="Game Icon" class="game-icon">
                    <div class="game-info">
                        <h2 class="game-title">${game.nom}</h2>
                        <p class="game-description">${game.description}</p>
                    </div>
                    <div class="game-actions">
                        <input type="checkbox" class="game-checkbox">
                        <button class="delete-button" data-id="${game.id_saved_grids}">🗑️</button>
                    </div>
                `;

                // Add click event listener to redirect to game details page
                gameItem.addEventListener("click", () => {
                    window.location.href = `http://localhost/projet-d-web/CruciWeb/sgame/?id=${game.id_saved_grids}`;
                });

                gamesListContainer.appendChild(gameItem);
            });

            // Add event listeners to the delete buttons
            const deleteButtons = document.querySelectorAll(".delete-button");
            deleteButtons.forEach(button => {
                button.addEventListener("click", (event) => {
                    event.stopPropagation(); // Prevent the click event from propagating to the game item
                    const gameId = event.target.dataset.id;
                    deleteGame(gameId);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching games:', error);
        });

    // Function to delete a game
    function deleteGame(gameId) {
        fetch(`http://localhost/projet-d-web/api/deleteSaveGame/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.succes) {
                    alert(data.succes);
                    // Remove the game item from the DOM
                    document.querySelector(`button[data-id="${gameId}"]`).closest('.game-item').remove();
                } else {
                    alert('Erreur lors de la suppression de la grille.');
                }
            })
            .catch(error => {
                console.error('Error deleting game:', error);
                alert('Erreur lors de la suppression de la grille.');
            });
    }
});