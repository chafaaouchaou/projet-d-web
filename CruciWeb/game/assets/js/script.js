document.addEventListener("DOMContentLoaded", function () {
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id"); // Get the 'id' value from the URL

if (!gameId) {
    // Handle the case where 'id' is not provided
    console.log("No 'id' parameter provided in the URL");
    
    return;
}

fetch(`/api/game/${gameId}`)
    .then(response => response.json())
    .then(data => {
        // Traitement des données reçues (affichage sur la page par exemple)
        console.log(data);
    })
    .catch(error => console.error('Error:', error));

console.log(gameId);
});


