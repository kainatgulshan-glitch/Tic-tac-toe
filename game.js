let currentPlayer = "X";
let gameover = false;
function play(cell) {
    if (cell.innerHTML !==""||gameover)
 return;
cell.innerHTML = currentPlayer;
if (checkwin()){
    document.getElementById("status").innerText = currentPlayer + " win!";
    gameover = true;
    return;
}
if (checkdraw()){
    document.getElementById("status").innerText ="It's a draw!";
    gameover = true;
    return;
}
currentPlayer = currentPlayer === "X" ? "O" : "X";
 document.getElementById("status").innerHTML =
 "Player " + currentPlayer + " turn";
}  
function checkwin() {
  let  cells =document.getElementsByClassName("cell");
  let patterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let p of patterns){
    let a = cells[p[0]]. innerHTML;
     let b = cells[p[1]]. innerHTML;  
     let c = cells[p[2]]. innerHTML;
     if (a && a ===b && b === c) {
        return true;
     }
  }
  return false;
}
function checkdraw() {
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells){
        if (cell.innerHTML === "") {
            return  false;
        }}
      return true;
}
function resetgame() {
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells){
        cell.innerHTML = "";
    }
        currentPlayer = "X";
        gameover = false;
 document.getElementById("status").innerText = "Player X turn";
    }