"use strict";

const gameBoard = (function () {
  const boardPlayer1 = [];
  const boardPlayer2 = [];

  return { boardPlayer1, boardPlayer2 };
})();

let gameControlModule = (function () {
  const box = document.querySelectorAll(".box");

  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { box, winningCondition };
})();

const playerAction = (function () {
  gameControlModule.box.forEach((el) =>
    el.addEventListener("click", function () {
      if (
        gameBoard.boardPlayer1.includes(Number(el.dataset.number)) ||
        gameBoard.boardPlayer2.includes(Number(el.dataset.number))
      )
        return;

      gameControlModule.box[el.dataset.number].textContent = "X";
      gameBoard.boardPlayer1.push(Number(el.dataset.number));
      console.log(gameBoard.boardPlayer1);
      dup();
    })
  );
})();

function dup() {
  for (let i = 0; i < gameControlModule.winningCondition.length; i++) {
    if (
      gameControlModule.winningCondition[i].every((x) =>
        gameBoard.boardPlayer1.includes(x)
      )
    ) {
      console.log("dup");
      gameBoard.boardPlayer1 = [];
      for (let i = 0; i < 9; i++) {
        gameControlModule.box[i].textContent = i + 1;
      }
    }
  }
}

// gameControlModule.box[3].textContent = "X";

// const createPlayer = (playerName, playerNumber, playerSymbol) => {
//   let getPlayerName = () => {
//     playerName;
//     console.log(`This is the name of player ${playerNumber}: ${playerName}`);
//   };

//   return { getPlayerName, playerName, playerNumber, playerSymbol };
// };

// let igor = createPlayer("Igor", 1, "X");
// let kinia = createPlayer("Kinia", 2, "O");
