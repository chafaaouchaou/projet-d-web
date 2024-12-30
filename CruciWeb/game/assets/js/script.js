// document.addEventListener("DOMContentLoaded", function () {
//     const params = new URLSearchParams(window.location.search);
//     const gameId = params.get("id"); // Get the 'id' value from the URL

//     if (!gameId) {
//         console.log("No 'id' parameter provided in the URL");
//         return;
//     }

//     let solutionGrid = [];
//     const playerGrid = Array.from({ length: 10 }, () => Array(10).fill('')); 
//     const gridContainer = document.getElementById('grid');
//     const messageContainer = document.getElementById('message');
//     let rows;
//     let cols;
    
    
//     fetch(`/projet-d-web/api/game/${gameId}`)
//         .then(response => response.json())
//         .then(data => {
            
//             console.log(data); // Vérifier les données reçues
//             const concatenatedGrid = data.concatenatedGrid;
//             rows = data.rows;
//             cols = data.cols;
//             console.log(rows);
//             console.log(cols);
            

//             // Construire solutionGrid
//             for (let i = 0; i < rows; i++) {
//                 const row = concatenatedGrid.slice(i * cols, (i + 1) * cols).split('');
//                 solutionGrid.push(row);
//             }
//             generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer,rows,cols);
            

//             // header = document.getElementById('header');
//             // header.textContent = data.name;

//             // description = document.getElementById('description');
//             // description.textContent = data.description;
            
//             // builedExpressions(data.horizontalDesc, data.verticalDesc);


//             // Appeler la fonction pour créer et afficher la grille
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// });

// document.querySelector('#validate').addEventListener('click', function(){
//     console.log('validate clicked');
// });

// document.querySelector('#save').addEventListener('click', function(){
//     console.log('save clicked');
// });


// // Fonction pour construire les expressions horizontales et verticales
// function builedExpressions(horizontalDesc, verticalDesc) {
//     const horizontal = document.getElementById('horizontal-desc');
//     const vertical = document.getElementById('vertical-desc');

//     // Construire les expressions horizontales
//     horizontalDesc.forEach((desc, index) => {
//         const div = document.createElement('div');
//         div.textContent = desc;
//         div.classList.add("fontstyle");
//         horizontal.appendChild(div);
//     });

//     // Construire les expressions verticales
//     verticalDesc.forEach((desc, index) => {
//         const div = document.createElement('div');
//         div.textContent = desc;
//         div.classList.add("fontstyle");
//         vertical.appendChild(div);
//     });
// }







// // Fonction pour générer et afficher la grille
// function generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols) {
//     gridContainer.innerHTML = ''; // Vider la grille existante

//     solutionGrid.forEach((row, rowIndex) => {
//         row.forEach((cell, colIndex) => {
//             const cellElement = document.createElement('div');
//             cellElement.classList.add('cell');

//             if (cell === '■') {
//                 // Cellule noire
//                 cellElement.classList.add('black');
//             } else {
//                 // Cellule editable
//                 const input = document.createElement('input');
//                 input.setAttribute('maxlength', '1');
//                 input.dataset.row = rowIndex;
//                 input.dataset.col = colIndex;

//                 // Mettre à jour la grille du joueur
//                 input.addEventListener('input', (e) => {
//                     const char = e.target.value.toUpperCase(); // Convertir en majuscule
//                     const row = e.target.dataset.row;
//                     const col = e.target.dataset.col;

//                     if (/^[A-Z]$/.test(char)) {
//                         playerGrid[row][col] = char;
//                     } else {
//                         playerGrid[row][col] = '';
//                         e.target.value = ''; // Vider le champ si non valide
//                     }

//                     // Vérifier si la grille est complète
//                     checkGrid(solutionGrid, playerGrid, messageContainer, rows, cols);
//                 });

//                 cellElement.appendChild(input);
//             }
//             gridContainer.appendChild(cellElement);
//         });
//     });
// }

// // Vérification de la grille
// function checkGrid(solutionGrid, playerGrid, messageContainer,rows,cols) {
//     let isComplete = true;
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             if (solutionGrid[i][j] !== '■') {
//                 if (playerGrid[i][j] !== solutionGrid[i][j]) {
//                     isComplete = false;
//                     break;
//                 }
//             }
//         }
//     }
//     if (isComplete) {
//         messageContainer.textContent = 'Félicitations, vous avez complété la grille ! 🎉';
//     } else {
//         messageContainer.textContent = '';
//     }
// }

import API_BASE_URL from '../../../config.js';



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
    // fetch(`/projet-d-web/api/game/${gameId}`)
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
            buildExpressions(data.horizontalDesc, data.verticalDesc);

        })
        .catch(error => {
            console.error('Erreur:', error);
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
            }
        }
    }
    if (isComplete) {
        messageContainer.textContent = 'Félicitations, vous avez complété la grille ! 🎉';
    } else {
        messageContainer.textContent = '';
    }
}


document.querySelector('#validate').addEventListener('click', function(){
    console.log('validate clicked');
});

document.querySelector('#save').addEventListener('click', function(){
    console.log('save clicked');
});