document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id"); // Récupérer l'ID du jeu à partir de l'URL

    if (!gameId) {
        console.log("Pas de paramètre 'id' fourni dans l'URL");
        return;
    }

    let solutionGrid = [];
    const playerGrid = Array.from({ length: 10 }, () => Array(10).fill('')); // Grille du joueur vide
    const gridContainer = document.getElementById('grid');
    const messageContainer = document.getElementById('message');
    let rows, cols;

    // Récupérer les données du jeu via une API
    fetch(`/projet-d-web/api/game/${gameId}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedGrid = data.concatenatedGrid;
            rows = data.rows;
            cols = data.cols;

            // Mettre à jour la taille de la grille (lignes et colonnes) dynamiquement
            gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;  // Ajuste le nombre de colonnes
            gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;     // Ajuste le nombre de lignes
            // Vérifiez si les styles sont bien appliqués
            console.log(`grid-template-columns: ${gridContainer.style.gridTemplateColumns}`);
            console.log(`grid-template-rows: ${gridContainer.style.gridTemplateRows}`);
            // Construire la grille de solution à partir de la chaîne concaténée
            for (let i = 0; i < rows; i++) {
                const row = concatenatedGrid.slice(i * cols, (i + 1) * cols).split('');
                solutionGrid.push(row);
            }

            // Générer et afficher la grille
            generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});

// Fonction pour générer et afficher la grille
function generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols) {
    gridContainer.innerHTML = ''; // Vider la grille existante

    solutionGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');

            if (cell === '■') {
                // Cellule noire
                cellElement.classList.add('black');
            } else {
                // Cellule editable
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

                    // Vérifier si la grille est complète
                    checkGrid(solutionGrid, playerGrid, messageContainer, rows, cols);
                });

                cellElement.appendChild(input);
            }
            gridContainer.appendChild(cellElement);
        });
    });
}

// Vérification de la grille
function checkGrid(solutionGrid, playerGrid, messageContainer, rows, cols) {
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
