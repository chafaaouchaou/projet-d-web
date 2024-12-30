import API_BASE_URL from '../../../../config.js';

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const savedGameId = params.get("id"); // Récupérer l'ID du jeu sauvegardé à partir de l'URL

    if (!savedGameId) {
        console.log("Pas de paramètre 'id' fourni dans l'URL");
        return;
    }

    let solutionGrid = [];
    const playerGrid = Array.from({ length: 10 }, () => Array(10).fill('')); // Grille du joueur vide
    const gridContainer = document.getElementById('grid');
    const messageContainer = document.getElementById('message');
    let rows, cols, gridId;

    // Récupérer les données du jeu sauvegardé via une API
    fetch(`${API_BASE_URL}/getSavedGame/${savedGameId}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedGrid = data.solutions;
            rows = data.nbr_lignes;
            cols = data.nbr_colonnes;
            gridId = data.grid_id; // Utiliser grid_id pour les opérations de sauvegarde
            const partialSolution = data.solution_partielle.split(',');

            // Mettre à jour la taille de la grille (lignes et colonnes) dynamiquement
            gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;  // Ajuste le nombre de colonnes
            gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;     // Ajuste le nombre de lignes

            // Construire la grille de solution à partir de la chaîne concaténée
            for (let i = 0; i < rows; i++) {
                const row = concatenatedGrid.slice(i * cols, (i + 1) * cols).split('');
                solutionGrid.push(row);
            }

            // Générer et afficher la grille
            generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols, partialSolution);
            buildExpressions(data.def_horizontales, data.def_verticales);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    // Ajouter les écouteurs d'événements pour les boutons
    document.querySelector('#validate').addEventListener('click', function () {
        const isComplete = checkGrid(solutionGrid, playerGrid, messageContainer, rows, cols);
        if (isComplete) {
            messageContainer.textContent = 'Félicitations, vous avez complété la grille ! 🎉';
        } else {
            messageContainer.textContent = 'La solution n\'est pas encore correcte.';
        }
    });

    document.querySelector('#save').addEventListener('click', function () {
        const solutionPartielle = playerGrid.map(row => row.join(',')).join(',');

        fetch(`${API_BASE_URL}/saveGame?gridId=${gridId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ solutionPartielle })
        })
            .then(response => response.json())
            .then(data => {
                if (data.succes) {
                    messageContainer.textContent = data.succes;
                } else {
                    messageContainer.textContent = 'Erreur lors de la sauvegarde de la grille.';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                messageContainer.textContent = 'Erreur lors de la sauvegarde de la grille.';
            });
    });
});

// Fonction pour construire les expressions horizontales et verticales
function buildExpressions(horizontalDesc, verticalDesc) {
    const horizontal = document.getElementById('horizontal-desc');
    const vertical = document.getElementById('vertical-desc');

    // Split the horizontal descriptions by ',' and build expressions
    horizontalDesc.split(',').forEach(desc => {
        const div = document.createElement('div');
        div.textContent = desc.trim(); // Remove any extra spaces
        div.classList.add("fontstyle");
        horizontal.appendChild(div);
    });

    // Split the vertical descriptions by ',' and build expressions
    verticalDesc.split(',').forEach(desc => {
        const div = document.createElement('div');
        div.textContent = desc.trim(); // Remove any extra spaces
        div.classList.add("fontstyle");
        vertical.appendChild(div);
    });
}

// Fonction pour générer et afficher la grille
function generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols, partialSolution) {
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

                // Pré-remplir avec la solution partielle
                const partialChar = partialSolution[rowIndex * cols + colIndex];
                if (partialChar && partialChar !== '') {
                    input.value = partialChar;
                    playerGrid[rowIndex][colIndex] = partialChar;
                }

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
    return isComplete;
}