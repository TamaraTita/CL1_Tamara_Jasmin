var board = Array(9).fill(null);
var currentPlayer = 'Player';
var gameIsRunning = true;

document.querySelectorAll('.cell').forEach((cell, i) => {
    cell.addEventListener('click', () => {
        if (gameIsRunning && !board[i]) {
            board[i] = currentPlayer;
            cell.style.backgroundImage = `url(images/game/${currentPlayer}.png)`;
            currentPlayer = currentPlayer === 'Player' ? 'Bot' : 'Player';
            checkGameStatus();
            if (gameIsRunning && currentPlayer === 'Bot') {
                makeBotMove();
            }
        }
    });
});

function makeBotMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'Bot';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = 'Bot';
    document.querySelectorAll('.cell')[move].style.backgroundImage = `url(images/game/Bot.png)`;
    currentPlayer = 'Player';
    checkGameStatus();
}

function minimax(board, depth, isMaximizing) {
    let winner = checkWinner();
    if (winner !== null) {
        return winner === 'Bot' ? 1 : winner === 'Player' ? -1 : 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'Bot';
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'Player';
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        if (board[combination[0]] && board[combination[0]] === board[combination[1]] && board[combination[0]] === board[combination[2]]) {
            return board[combination[0]];
        }
    }

    if (!board.includes(null)) {
        return 'draw';
    }

    return null;
}

function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        if (board[combination[0]] && board[combination[0]] === board[combination[1]] && board[combination[0]] === board[combination[2]]) {
            gameIsRunning = false;
            setTimeout(() => {
                console.log(board[combination[0]]);
                showPopup(board[combination[0]] === 'Player' ? 'Du hast eine Tour gewonnen. Herzlichen Glückwunsch!' : 'Du hast leider verloren. Versuche es erneut!');
            }, 100);
            return;
        }
    }

    if (!board.includes(null)) {
        gameIsRunning = false;
        showPopup('Du hast eine Tour gewonnen. Herzlichen Glückwunsch');
    }
}

function showPopup(message) {
    document.getElementById('overlay').classList.remove('hidden');
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup-message').textContent = message;
}

document.getElementById('popup-button').addEventListener('click', () => {
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('popup').classList.add('hidden');
    restartGame();
});

document.getElementById('restart-button').addEventListener('click', restartGame);

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'Player';
    gameIsRunning = true;
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundImage = '');
}