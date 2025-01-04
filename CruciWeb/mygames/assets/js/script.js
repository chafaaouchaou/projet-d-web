import API_BASE_URL from '../../../../config.js';

class SavedGamesManager {
    constructor() {
        this.gamesListContainer = document.querySelector(".games-list");
        this.modal = document.getElementById('login-modal');
        this.goBackBtn = document.getElementById('go-back-btn');
        
        this.init();
    }

    init() {
        this.handleSession();
        this.loadSavedGames();
    }

    async loadSavedGames() {
        try {
            const games = await this.fetchSavedGames();
            this.renderGames(games);
            this.setupDeleteButtons();
        } catch (error) {
            console.error('Error fetching games:', error);
            this.showError('Error loading saved games');
        }
    }

    async fetchSavedGames() {
        const response = await fetch(`${API_BASE_URL}/getSavedGames`);
        return response.json();
    }

    renderGames(games) {
        this.gamesListContainer.innerHTML = '';
        games.forEach(game => this.createGameItem(game));
    }

    createGameItem(game) {
        const gameItem = document.createElement("div");
        gameItem.classList.add("game-item", "clicabale");

        gameItem.innerHTML = this.getGameItemTemplate(game);
        
        gameItem.addEventListener("click", () => {
            window.location.href = `/projet-d-web/CruciWeb/sgame/?id=${game.id_saved_grids}`;
        });

        this.gamesListContainer.appendChild(gameItem);
    }

    getGameItemTemplate(game) {
        return `
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
    }

    setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const gameId = event.target.dataset.id;
                this.deleteGame(gameId);
            });
        });
    }

    async deleteGame(gameId) {
        try {
            const response = await fetch(`${API_BASE_URL}/deleteSaveGame/${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();

            if (data.succes) {
                this.handleSuccessfulDeletion(gameId, data.succes);
            } else {
                this.showError('Erreur lors de la suppression de la grille.');
            }
        } catch (error) {
            console.error('Error deleting game:', error);
            this.showError('Erreur lors de la suppression de la grille.');
        }
    }

    handleSuccessfulDeletion(gameId, message) {
        alert(message);
        const gameItem = document.querySelector(`button[data-id="${gameId}"]`).closest('.game-item');
        if (gameItem) {
            gameItem.remove();
        }
    }

    handleSession() {
        if (!this.checkSessionCookie()) {
            this.modal.style.display = 'flex';
        } else {
            this.modal.style.display = 'none';
        }

        this.goBackBtn.addEventListener('click', () => this.handleGoBack());
    }

    checkSessionCookie() {
        return document.cookie.split(';').some((item) => 
            item.trim().startsWith('PHPSESSID=')
        );
    }

    handleGoBack() {
        this.clearSessionCookie();
        window.history.back();
    }

    clearSessionCookie() {
        const cookieOptions = [
            `PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`,
            'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        ];
        
        cookieOptions.forEach(option => {
            document.cookie = option;
        });
    }

    showError(message) {
        alert(message);
    }
}

document.addEventListener("DOMContentLoaded", () => new SavedGamesManager());