import API_BASE_URL from '../../../../config.js';

document.addEventListener("DOMContentLoaded", () => {
    const gamesListContainer = document.querySelector(".games-list");

    // Fetch saved games from the API
    fetch(`${API_BASE_URL}/getSavedGames`)
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
                    window.location.href = `/projet-d-web/CruciWeb/sgame/?id=${game.id_saved_grids}`;
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

    // Function to delete a game____________________________________________
    function deleteGame(gameId) {
        fetch(`${API_BASE_URL}/deleteSaveGame/${gameId}`, {
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




function checkSessionCookie() {
    let sessionCookie = document.cookie.split(';').some((item) => item.trim().startsWith('PHPSESSID='));
    return sessionCookie;
}

// Function to show or hide the modal based on session cookie
function handleSession() {
    const modal = document.getElementById('login-modal');
    const goBackBtn = document.getElementById('go-back-btn');

    if (!checkSessionCookie()) {
        modal.style.display = 'flex'; // Show modal if no session cookie
    } else {
        modal.style.display = 'none'; // Hide modal if session cookie is set
    }

    // Handle "Go Back" button click
    goBackBtn.addEventListener('click', function() {
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.hostname;
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        window.history.back(); // Go back to the previous page
    });
}

// Wait for the DOM to load before checking the session cookie
document.addEventListener('DOMContentLoaded', function() {
    handleSession();
});