// view.js
class GameView {
    constructor(container) {
        this.container = container;
    }

    renderGames(games) {
        this.container.innerHTML = ""; // Clear any previous content
        games.forEach(game => {
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game");
            gameDiv.dataset.id = game.id;

            const gameTitle = document.createElement("h2");
            gameTitle.textContent = game.name;

            const gameDescription = document.createElement("p");
            gameDescription.textContent = game.description;

            gameDiv.appendChild(gameTitle);
            gameDiv.appendChild(gameDescription);
            this.container.appendChild(gameDiv);
        });

    }

    showError(message) {
        this.container.innerHTML = `<p>Error loading games: ${message}</p>`;
    }
}
