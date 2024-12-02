document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id"); // Get the 'id' value from the URL

    if (!gameId) {
        console.log("No 'id' parameter provided in the URL");
        return;
    }

    let solutionGrid = [];
    const playerGrid = Array.from({ length: 10 }, () => Array(10).fill('')); 
    const gridContainer = document.getElementById('grid');
    const messageContainer = document.getElementById('message');
    let rows;
    let cols;

    // Récupération des données via fetch
    fetch(`/api/game/${gameId}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedGrid = data.concatenatedGrid;
            rows = data.rows;
            cols = data.cols;

            // Construire solutionGrid
            for (let i = 0; i < rows; i++) {
                const row = concatenatedGrid.slice(i * cols, (i + 1) * cols).split('');
                solutionGrid.push(row);
            }

            console.log(solutionGrid); // Vérifier les données reçues

            // Appeler la fonction pour créer et afficher la grille
            generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer,rows,cols);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Fonction pour générer et afficher la grille
function generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer,rows,cols) {
    gridContainer.innerHTML = ''; // Vider la grille existante si besoin

    solutionGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');

            if (cell === '■') {
                // Cellule noire
                cellElement.classList.add('black');
            } else {
                // Cellule éditable
                const input = document.createElement('input');
                input.setAttribute('maxlength', '1');
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;

                // Mettre à jour la grille du joueur
                input.addEventListener('input', (e) => {
                    const char = e.target.value.toUpperCase(); // Convertir en majuscule
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;

                    if (/^[A-Z]$/.test(char)) {
                        playerGrid[row][col] = char;
                    } else {
                        playerGrid[row][col] = '';
                        e.target.value = ''; // Vider le champ si non valide
                    }
                    checkGrid(solutionGrid, playerGrid, messageContainer,rows,cols);
                });

                cellElement.appendChild(input);
            }
            gridContainer.appendChild(cellElement);
        });
    });
}

// Vérification de la grille
function checkGrid(solutionGrid, playerGrid, messageContainer,rows,cols) {
    let isComplete = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (solutionGrid[i][j] !== '■') {
                if (playerGrid[i][j] !== solutionGrid[i][j]) {
                    isComplete = false;
                    break;
                }
            }
        }
    }
    if (isComplete) {
        messageContainer.textContent = 'Félicitations, vous avez complété la grille ! 🎉';
    } else {
        messageContainer.textContent = '';
    }
}
