// document.addEventListener("DOMContentLoaded", function () {
//     const gamesContainer = document.getElementById("games-container");

//     fetch("http://localhost/api/games")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok: " + response.statusText);
//             }
            
//             return response.json();
//         })
//         .then(games => {
//             gamesContainer.innerHTML = ""; // Clear loading message
            
//             games.forEach(game => {
//                 // Create the game container
//                 const gameDiv = document.createElement("div");
//                 gameDiv.classList.add("game");
//                 gameDiv.dataset.id = game.id; // Store the game ID as a dataset attribute

//                 const gameTitle = document.createElement("h2");
//                 gameTitle.textContent = game.name;

//                 const gameDescription = document.createElement("p");
//                 gameDescription.textContent = game.description;

//                 gameDiv.appendChild(gameTitle);
//                 gameDiv.appendChild(gameDescription);

//                 // Add click event to redirect to game page
//                 gameDiv.addEventListener("click", () => {
//                     const gameId = gameDiv.dataset.id;
//                     window.location.href = `http://localhost/CruciWeb/game?id=${gameId}`;
//                 });

//                 gamesContainer.appendChild(gameDiv);
//             });
//         })
//         .catch(error => {
//             gamesContainer.innerHTML = `<p>Error loading games: ${error.message}</p>`;
//         });
// });