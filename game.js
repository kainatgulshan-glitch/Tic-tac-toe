let currentPlayer = "X";
let gameover = false;
let scores = { X: 0, O: 0, Draw: 0 };

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function play(cell) {
    if (cell.innerHTML !== "" || gameover) return;

    // Place mark
    cell.innerHTML = currentPlayer;
    cell.classList.add("taken", currentPlayer === "X" ? "x-mark" : "o-mark");

    const winResult = checkwin();
    if (winResult) {
        // Highlight winning cells
        const cells = document.getElementsByClassName("cell");
        winResult.forEach(idx => cells[idx].classList.add("winner"));

        setStatus(`<span class="win-msg">🎉 Player ${currentPlayer} Wins!</span>`);
        scores[currentPlayer]++;
        updateScores();
        gameover = true;
        return;
    }

    if (checkdraw()) {
        setStatus(`<span class="draw-msg">🤝 It's a Draw!</span>`);
        scores.Draw++;
        updateScores();
        gameover = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const colorClass = currentPlayer === "X" ? "x-color" : "o-color";
    setStatus(`Player <span id="currentMark" class="${colorClass}">${currentPlayer}</span>'s Turn`);
}

function checkwin() {
    const cells = document.getElementsByClassName("cell");
    for (let p of winPatterns) {
        const a = cells[p[0]].innerHTML;
        const b = cells[p[1]].innerHTML;
        const c = cells[p[2]].innerHTML;
        if (a && a === b && b === c) {
            return p; // return winning indices
        }
    }
    return null;
}

function checkdraw() {
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        if (cell.innerHTML === "") return false;
    }
    return true;
}

function resetgame() {
    const cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerHTML = "";
        cell.className = "cell"; // remove all state classes
    }
    currentPlayer = "X";
    gameover = false;
    setStatus(`Player <span id="currentMark" class="x-color">X</span>'s Turn`);
}

function setStatus(html) {
    document.getElementById("status").innerHTML = html;
}

function updateScores() {
    document.getElementById("scoreX").textContent = scores.X;
    document.getElementById("scoreO").textContent = scores.O;
    document.getElementById("scoreDraw").textContent = scores.Draw;
}
