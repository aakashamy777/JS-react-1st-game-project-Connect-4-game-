class ConnectFour {
    constructor() {
        this.board = Array(6).fill().map(() => Array(7).fill(null));
        this.isRedTurn = true;
        this.winner = null;
        this.isGameOver = false;
        
        this.gameBoard = document.getElementById('gameBoard');
        this.gameInfo = document.getElementById('gameInfo');
        this.resetButton = document.getElementById('resetButton');
        
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        // Create the game board cells
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.gameBoard.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        this.gameBoard.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell && !this.isGameOver) {
                const col = parseInt(cell.dataset.col);
                this.handleClick(col);
            }
        });

        this.resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    checkWinner() {
        // Check horizontal
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = this.board[row][col];
                if (cell && 
                    cell === this.board[row][col + 1] && 
                    cell === this.board[row][col + 2] && 
                    cell === this.board[row][col + 3]) {
                    return cell;
                }
            }
        }

        // Check vertical
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = this.board[row][col];
                if (cell && 
                    cell === this.board[row + 1][col] && 
                    cell === this.board[row + 2][col] && 
                    cell === this.board[row + 3][col]) {
                    return cell;
                }
            }
        }

        // Check diagonal (positive slope)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = this.board[row][col];
                if (cell && 
                    cell === this.board[row + 1][col + 1] && 
                    cell === this.board[row + 2][col + 2] && 
                    cell === this.board[row + 3][col + 3]) {
                    return cell;
                }
            }
        }

        // Check diagonal (negative slope)
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = this.board[row][col];
                if (cell && 
                    cell === this.board[row - 1][col + 1] && 
                    cell === this.board[row - 2][col + 2] && 
                    cell === this.board[row - 3][col + 3]) {
                    return cell;
                }
            }
        }

        return null;
    }

    handleClick(col) {
        let row = 5;

        // Find the lowest empty cell in the column
        while (row >= 0 && this.board[row][col] !== null) {
            row--;
        }

        if (row >= 0) {
            this.board[row][col] = this.isRedTurn ? 'red' : 'yellow';
            this.updateCell(row, col);

            const gameWinner = this.checkWinner();
            if (gameWinner) {
                this.winner = gameWinner;
                this.isGameOver = true;
                this.updateGameInfo();
            } else {
                this.isRedTurn = !this.isRedTurn;
                this.updateGameInfo();
            }
        }
    }

    updateCell(row, col) {
        const cell = this.gameBoard.children[row * 7 + col];
        cell.className = `cell ${this.board[row][col]}`;
    }

    updateGameInfo() {
        if (this.winner) {
            this.gameInfo.textContent = `Winner: ${this.winner === 'red' ? 'Red' : 'Yellow'}`;
        } else if (this.isGameOver) {
            this.gameInfo.textContent = "Game Over!";
        } else {
            this.gameInfo.textContent = `Current Turn: ${this.isRedTurn ? 'Red' : 'Yellow'}`;
        }
    }

    resetGame() {
        this.board = Array(6).fill().map(() => Array(7).fill(null));
        this.isRedTurn = true;
        this.winner = null;
        this.isGameOver = false;
        
        // Reset all cells
        Array.from(this.gameBoard.children).forEach(cell => {
            cell.className = 'cell';
        });
        
        this.updateGameInfo();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConnectFour();
}); 