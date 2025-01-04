import API_BASE_URL from '../../../../config.js';

class GamesManager {
    constructor() {
        this.gamesContainer = document.getElementById("games-container");
        this.levelSelect = document.getElementById("level-select");
        this.dateSelect = document.getElementById("date-select");
        
        this.bindEvents();
        this.loadInitialGames();
    }

    bindEvents() {
        this.levelSelect?.addEventListener("change", () => this.handleFilterGames());
        this.dateSelect?.addEventListener("change", () => this.handleFilterGames());
    }

    async loadInitialGames() {
        try {
            const games = await this.fetchGames(`${API_BASE_URL}/games`);
            this.renderGames(games);
        } catch (error) {
            this.showError(error);
        }
    }

    async handleFilterGames() {
        try {
            const url = this.buildFilterUrl();
            const games = await this.fetchGames(url);
            this.renderGames(games);
        } catch (error) {
            this.showError(error);
        }
    }

    buildFilterUrl() {
        const params = new URLSearchParams();
        
        if (this.levelSelect?.value) {
            params.append('niveau_difficulte', this.levelSelect.value);
        }
        if (this.dateSelect?.value) {
            params.append('date_de_creation', this.dateSelect.value);
        }
        
        // Ajouter un timestamp pour éviter le cache
        params.append('_', new Date().getTime());

        return `${API_BASE_URL}/games/filtered?${params.toString()}`;
    }

    async fetchGames(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    }

    renderGames(games) {
        this.gamesContainer.innerHTML = "";
        games.forEach(game => this.createGameCard(game));
    }

    createGameCard(game) {
        const gameCard = document.createElement('div');
        gameCard.className = 'game';
        gameCard.dataset.id = game.id;

        const gameContent = `
            <img src="assets/images/card-image.png" alt="${game.name} Image">
            <div class="gametext">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
            </div>
        `;

        gameCard.innerHTML = gameContent;
        gameCard.addEventListener('click', () => this.navigateToGame(game.id));
        
        this.gamesContainer.appendChild(gameCard);
    }

    navigateToGame(gameId) {
        window.location.href = `/projet-d-web/CruciWeb/game?id=${gameId}`;
    }

    showError(error) {
        console.error('Error:', error);
        this.gamesContainer.innerHTML = `
            <p>Error loading games: ${error.message}</p>
        `;
    }
}

// Initialize the manager when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => new GamesManager());