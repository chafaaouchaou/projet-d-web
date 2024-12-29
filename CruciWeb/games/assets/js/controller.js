// // controller.js
// class GameController {
//     constructor(view) {
//         this.view = view;
//     }

//     loadGames() {
//         GameModel.fetchGames()
//             .then(games => this.view.renderGames(games))
//             .catch(error => this.view.showError(error.message));
//     }

//     handleGameClick(event) {
//         const gameDiv = event.target.closest(".game");
//         const gameId = gameDiv ? gameDiv.dataset.id : null;
//         if (gameId) {
//             window.location.href = `http://localhost/CruciWeb/game?id=${gameId}`;
//         }
//     }
// }
