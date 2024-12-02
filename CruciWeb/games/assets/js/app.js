// app.js
document.addEventListener("DOMContentLoaded", function () {
    const gamesContainer = document.getElementById("games-container");

    const gameView = new GameView(gamesContainer);
    const gameController = new GameController(gameView);

    gamesContainer.addEventListener("click", (event) => gameController.handleGameClick(event));

    gameController.loadGames();
});
