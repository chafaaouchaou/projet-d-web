import API_BASE_URL from '../../../../config.js';

document.addEventListener("DOMContentLoaded", function () {
    const gameNameInput = document.getElementById('game-name');
    const gameDescriptionInput = document.getElementById('game-description');
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const difficultySelect = document.getElementById('difficulty');
    const horizontalExpressionInput = document.getElementById('horizontal-expression');
    const verticalExpressionInput = document.getElementById('vertical-expression');
    const addHorizontalButton = document.getElementById('add-horizontal');
    const addVerticalButton = document.getElementById('add-vertical');
    const horizontalDescContainer = document.getElementById('horizontal-desc');
    const verticalDescContainer = document.getElementById('vertical-desc');
    const gridContainer = document.getElementById('grid');
    const createButton = document.getElementById('create');

    let horizontalDesc = [];
    let verticalDesc = [];
    let playerGrid = [];

    function initializeGrid(rows, cols) {
        playerGrid = Array.from({ length: rows }, () => Array(cols).fill(''));
        generateGrid(rows, cols, gridContainer);
    }

    rowsInput.addEventListener('input', () => {
        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);
        initializeGrid(rows, cols);
    });

    colsInput.addEventListener('input', () => {
        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);
        initializeGrid(rows, cols);
    });

    addHorizontalButton.addEventListener('click', () => {
        const expression = horizontalExpressionInput.value.trim();
        if (expression) {
            horizontalDesc.push(expression);
            const div = document.createElement('div');
            div.textContent = expression;
            div.classList.add("fontstyle");
            div.addEventListener('click', () => {
                horizontalDesc = horizontalDesc.filter(item => item !== expression);
                horizontalDescContainer.removeChild(div);
            });
            horizontalDescContainer.appendChild(div);
            horizontalExpressionInput.value = '';
        }
    });

    addVerticalButton.addEventListener('click', () => {
        const expression = verticalExpressionInput.value.trim();
        if (expression) {
            verticalDesc.push(expression);
            const div = document.createElement('div');
            div.textContent = expression;
            div.classList.add("fontstyle");
            div.addEventListener('click', () => {
                verticalDesc = verticalDesc.filter(item => item !== expression);
                verticalDescContainer.removeChild(div);
            });
            verticalDescContainer.appendChild(div);
            verticalExpressionInput.value = '';
        }
    });

    createButton.addEventListener('click', () => {
        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);

        if (horizontalDesc.length !== rows) {
            alert('Le nombre de définitions horizontales doit être égal au nombre de lignes.');
            return;
        }

        if (verticalDesc.length !== cols) {
            alert('Le nombre de définitions verticales doit être égal au nombre de colonnes.');
            return;
        }

        const gameData = {
            nom: gameNameInput.value,
            description: gameDescriptionInput.value,
            lignes: rows,
            colonnes: cols,
            defHorizontales: horizontalDesc,
            defVerticales: verticalDesc,
            casesNoire: [], // This should be filled based on the grid
            solutions: getSolutionString(playerGrid), // Generate the solution string
            niveauDifficulte: difficultySelect.value
        };
        console.log('Game data:', gameData);

        // Send POST request to create the grid
        fetch(`${API_BASE_URL}/addGrid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Grid created successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to create grid.');
        });
    });

    function generateGrid(rows, cols, gridContainer) {
        gridContainer.innerHTML = ''; // Clear existing grid

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                const input = document.createElement('input');
                input.setAttribute('maxlength', '1');
                input.dataset.row = i;
                input.dataset.col = j;
                input.addEventListener('input', (e) => {
                    const char = e.target.value.toUpperCase(); // Convert to uppercase
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;

                    if (/^[A-Z]$/.test(char)) {
                        playerGrid[row][col] = char;
                    } else {
                        playerGrid[row][col] = '';
                        e.target.value = ''; // Clear the field if invalid
                    }
                });
                cellElement.appendChild(input);
                gridContainer.appendChild(cellElement);
            }
        }

        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    }

    function getSolutionString(grid) {
        return grid.map(row => row.map(cell => cell || '■').join('')).join('');
    }

    // Initialize the grid on page load
    initializeGrid(parseInt(rowsInput.value), parseInt(colsInput.value));
});