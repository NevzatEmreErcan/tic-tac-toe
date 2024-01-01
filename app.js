const cells_div = document.querySelectorAll(".cell");
const result_p = document.querySelector(".result");
const replay_btn = document.querySelector(".replay");

let currentPlayer = "X";
let gameBoard  = []
let isGameActive = true

function renderBoard() {
    gameBoard = Array.from(cells_div).map((cell) => cell = cell.textContent);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    //Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    //Columns
        [0, 4, 8], [2, 4, 6]                //Diognal
    ]

    for (const combination of winningCombinations){
        const [a, b, c] = combination;
        
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            result_p.textContent = `Player ${currentPlayer} win the game!`
            isGameActive = false;
        }
    }

    if (!gameBoard.includes("")) {
        result_p.textContent = "It's a tie!"
        isGameActive = false
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
}

function clickCell() {
    if (this.textContent === "" && isGameActive){
        this.textContent = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
        console.log(gameBoard)
    }
}

function resetGame() {
    cells_div.forEach((cell) => cell.textContent = "");
    currentPlayer = "X";
    isGameActive = true;
    renderBoard();
}

// Event Listeners
cells_div.forEach((cell) => cell.addEventListener("click", clickCell))
replay_btn.addEventListener("click", resetGame)

renderBoard();