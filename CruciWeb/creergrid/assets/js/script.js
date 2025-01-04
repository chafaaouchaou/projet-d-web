import API_BASE_URL from '../../../../config.js';

class CrosswordGameManager {
    constructor() {
        this.initializeElements();
        this.horizontalDesc = [];
        this.verticalDesc = [];
        this.playerGrid = [];
        
        this.bindEvents();
        this.initializeGrid(parseInt(this.rowsInput.value), parseInt(this.colsInput.value));
    }

    initializeElements() {
        this.elements = {
            gameNameInput: document.getElementById('game-name'),
            gameDescriptionInput: document.getElementById('game-description'),
            rowsInput: document.getElementById('rows'),
            colsInput: document.getElementById('cols'),
            difficultySelect: document.getElementById('difficulty'),
            horizontalExpressionInput: document.getElementById('horizontal-expression'),
            verticalExpressionInput: document.getElementById('vertical-expression'),
            addHorizontalButton: document.getElementById('add-horizontal'),
            addVerticalButton: document.getElementById('add-vertical'),
            horizontalDescContainer: document.getElementById('horizontal-desc'),
            verticalDescContainer: document.getElementById('vertical-desc'),
            gridContainer: document.getElementById('grid'),
            createButton: document.getElementById('create')
        };
        
        // Destructure elements for easier access
        Object.assign(this, this.elements);
    }

    bindEvents() {
        this.rowsInput.addEventListener('input', () => this.handleGridSizeChange());
        this.colsInput.addEventListener('input', () => this.handleGridSizeChange());
        this.addHorizontalButton.addEventListener('click', () => this.addDescription('horizontal'));
        this.addVerticalButton.addEventListener('click', () => this.addDescription('vertical'));
        this.createButton.addEventListener('click', () => this.createGame());
    }

    handleGridSizeChange() {
        const rows = parseInt(this.rowsInput.value);
        const cols = parseInt(this.colsInput.value);
        this.initializeGrid(rows, cols);
    }

    initializeGrid(rows, cols) {
        this.playerGrid = Array.from({ length: rows }, () => Array(cols).fill(''));
        this.generateGrid(rows, cols);
    }

    generateGrid(rows, cols) {
        this.gridContainer.innerHTML = '';
        this.gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.createGridCell(i, j);
            }
        }
    }

    createGridCell(row, col) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        
        const input = document.createElement('input');
        input.setAttribute('maxlength', '1');
        input.dataset.row = row;
        input.dataset.col = col;
        
        input.addEventListener('input', (e) => this.handleCellInput(e));
        
        cellElement.appendChild(input);
        this.gridContainer.appendChild(cellElement);
    }

    handleCellInput(e) {
        const char = e.target.value.toUpperCase();
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        if (/^[A-Z]$/.test(char)) {
            this.playerGrid[row][col] = char;
        } else {
            this.playerGrid[row][col] = '';
            e.target.value = '';
        }
    }

    addDescription(type) {
        const isHorizontal = type === 'horizontal';
        const input = isHorizontal ? this.horizontalExpressionInput : this.verticalExpressionInput;
        const container = isHorizontal ? this.horizontalDescContainer : this.verticalDescContainer;
        const descArray = isHorizontal ? this.horizontalDesc : this.verticalDesc;

        const expression = input.value.trim();
        if (!expression) return;

        descArray.push(expression);
        this.createDescriptionElement(expression, container, descArray);
        input.value = '';
    }

    createDescriptionElement(expression, container, descArray) {
        const div = document.createElement('div');
        div.textContent = expression;
        div.classList.add("fontstyle");
        
        div.addEventListener('click', () => {
            const index = descArray.indexOf(expression);
            if (index > -1) {
                descArray.splice(index, 1);
                container.removeChild(div);
            }
        });
        
        container.appendChild(div);
    }

    validateGrid() {
        const rows = parseInt(this.rowsInput.value);
        const cols = parseInt(this.colsInput.value);

        if (this.horizontalDesc.length !== rows) {
            throw new Error('Le nombre de définitions horizontales doit être égal au nombre de lignes.');
        }

        if (this.verticalDesc.length !== cols) {
            throw new Error('Le nombre de définitions verticales doit être égal au nombre de colonnes.');
        }
    }

    getSolutionString() {
        return this.playerGrid.map(row => row.map(cell => cell || '■').join('')).join('');
    }

    createGame() {
        try {
            this.validateGrid();

            const gameData = {
                nom: this.gameNameInput.value,
                description: this.gameDescriptionInput.value,
                lignes: parseInt(this.rowsInput.value),
                colonnes: parseInt(this.colsInput.value),
                defHorizontales: this.horizontalDesc,
                defVerticales: this.verticalDesc,
                casesNoire: [],
                solutions: this.getSolutionString(),
                niveauDifficulte: this.difficultySelect.value
            };

            this.saveGame(gameData);
        } catch (error) {
            alert(error.message);
        }
    }

    async saveGame(gameData) {
        try {
            const response = await fetch(`${API_BASE_URL}/addGrid`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameData)
            });

            const data = await response.json();
            
            if (data.erreur) {
                alert(data.erreur);
            } else {
                alert('Grid created successfully!');
                window.location.href = '/projet-d-web/CruciWeb/';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create grid.');
        }
    }
}

class SessionManager {
    static checkSessionCookie() {
        return document.cookie.split(';').some((item) => item.trim().startsWith('PHPSESSID='));
    }

    static handleSession() {
        const modal = document.getElementById('login-modal');
        const goBackBtn = document.getElementById('go-back-btn');

        modal.style.display = this.checkSessionCookie() ? 'none' : 'flex';
        goBackBtn.addEventListener('click', () => window.history.back());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CrosswordGameManager();
    SessionManager.handleSession();
});