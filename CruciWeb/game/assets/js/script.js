import API_BASE_URL from '../../../../config.js';

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
    fetch(`${API_BASE_URL}/game/${gameId}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedGrid = data.concatenatedGrid;
            rows = data.rows;
            cols = data.cols;
            console.log(data);

            // Mettre à jour la taille de la grille (lignes et colonnes) dynamiquement
            gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;  // Ajuste le nombre de colonnes
            gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;     // Ajuste le nombre de lignes

            // Construire la grille de solution à partir de la chaîne concaténée
            for (let i = 0; i < rows; i++) {
                const row = concatenatedGrid.slice(i * cols, (i + 1) * cols).split('');
                solutionGrid.push(row);
            }

            // Générer et afficher la grille
            generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols);
            buildExpressions(data.horizontalDesc, data.verticalDesc);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    // Ajouter les écouteurs d'événements pour les boutons
    document.querySelector('#validate').addEventListener('click', function () {
        const isComplete = checkGrid(solutionGrid, playerGrid, messageContainer, rows, cols);
        if (isComplete) {
            messageContainer.classList.add('succes');
            messageContainer.classList.remove('error');
            messageContainer.textContent = 'Félicitations, vous avez complété la grille ! 🎉';
        } else {
            messageContainer.classList.remove('succes');
            messageContainer.classList.add('error');

            messageContainer.textContent = 'La solution n\'est pas encore correcte.';
        }
    });

    document.querySelector('#save').addEventListener('click', function () {
        // Vérifier si le cookie PHPSESSID existe
        let sessionCookie = document.cookie.split(';').some((item) => item.trim().startsWith('PHPSESSID='));
        
        if (!sessionCookie) {
            // Si le cookie n'existe pas, afficher un message d'erreur
            messageContainer.classList.remove('succes');
            messageContainer.classList.add('error');
            messageContainer.textContent = 'Vous devez vous connecter pour sauvegarder votre progression.';
            return;
        }
    
        // Si le cookie existe, continuer avec la sauvegarde
        const solutionPartielle = playerGrid.map(row => row.join(',')).join(',');
    
        fetch(`${API_BASE_URL}/saveGame?gridId=${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ solutionPartielle })
        })
            .then(response => response.json())
            .then(data => {
                if (data.succes) {
                    console.log(solutionPartielle);
                    messageContainer.classList.add('succes');
                    messageContainer.classList.remove('error');
                    messageContainer.textContent = data.succes;
                } else {
                    messageContainer.classList.remove('succes');
                    messageContainer.classList.add('error');
                    messageContainer.textContent = 'Erreur lors de la sauvegarde de la grille.';
                }
            })
            .catch(error => {
                messageContainer.classList.remove('succes');
                messageContainer.classList.add('error');
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
            }else{
                
            }
        }
    }
    return isComplete;
}
