import API_BASE_URL from '../../../../config.js';

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");

    if (!gameId) {
        console.log("Pas de paramètre 'id' fourni dans l'URL");
        return;
    }

    let solutionGrid = [];
    let playerGrid;
    const gridContainer = document.getElementById('grid');
    const messageContainer = document.getElementById('message');
    let rows, cols;

    fetch(`${API_BASE_URL}/game/${gameId}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedGrid = data.concatenatedGrid;
            rows = data.rows;
            cols = data.cols;
            console.log(data);

            // Initialiser playerGrid avec des dimensions dynamiques
            playerGrid = Array.from({ length: rows }, () => Array(cols).fill(''));

            gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
            gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;

            for (let i = 0; i < rows; i++) {
                const row = concatenatedGrid.slice(i * cols, (i + 1) * cols).split('');
                solutionGrid.push(row);
            }

            generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols);
            buildExpressions(data.horizontalDesc, data.verticalDesc);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

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
        let sessionCookie = document.cookie.split(';').some((item) => item.trim().startsWith('PHPSESSID='));

        if (!sessionCookie) {
            messageContainer.classList.remove('succes');
            messageContainer.classList.add('error');
            messageContainer.textContent = 'Vous devez vous connecter pour sauvegarder votre progression.';
            return;
        }

        const solutionPartielle = playerGrid.map(row => row.join(',')).join(',');
        if (!solutionPartielle || solutionPartielle === Array(rows).fill(Array(cols).fill('').join(',')).join(',')) {
            messageContainer.classList.remove('succes');
            messageContainer.classList.add('error');
            messageContainer.textContent = 'Aucune progression détectée à sauvegarder.';
            return;
        }

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

function buildExpressions(horizontalDesc, verticalDesc) {
    const horizontal = document.getElementById('horizontal-desc');
    const vertical = document.getElementById('vertical-desc');

    horizontalDesc.split(',').forEach(desc => {
        const div = document.createElement('div');
        div.textContent = desc.trim();
        div.classList.add("fontstyle");
        horizontal.appendChild(div);
    });

    verticalDesc.split(',').forEach(desc => {
        const div = document.createElement('div');
        div.textContent = desc.trim();
        div.classList.add("fontstyle");
        vertical.appendChild(div);
    });
}

function generateGrid(solutionGrid, gridContainer, playerGrid, messageContainer, rows, cols) {
    gridContainer.innerHTML = '';

    solutionGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');

            if (cell === '■') {
                cellElement.classList.add('black');
            } else {
                const input = document.createElement('input');
                input.setAttribute('maxlength', '1');
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;

                input.addEventListener('input', (e) => {
                    const char = e.target.value.toUpperCase();
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;

                    if (/^[A-Z]$/.test(char)) {
                        playerGrid[row][col] = char;
                    } else {
                        playerGrid[row][col] = '';
                        e.target.value = '';
                    }

                    checkGrid(solutionGrid, playerGrid, messageContainer, rows, cols);
                });

                cellElement.appendChild(input);
            }
            gridContainer.appendChild(cellElement);
        });
    });
}

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
