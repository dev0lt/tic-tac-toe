"use strict";

const point = document.querySelectorAll(".point");
const players = document.querySelectorAll(".player");

const gameBoard = (function () {
  const board = [[], []];

  let score = [0, 0];

  let clicks = 0;

  let currentPlayer = 0;
  let token = "O";

  return {
    board,
    currentPlayer,
    token,
    clicks,
    score,
  };
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

  function changePlayer() {
    if (gameBoard.clicks === 0) return;

    gameBoard.currentPlayer === 0
      ? ((gameBoard.currentPlayer = 1), (gameBoard.token = "X"))
      : ((gameBoard.currentPlayer = 0), (gameBoard.token = "O"));
  }

  function checkWin() {
    for (let i = 0; i < gameControlModule.winningCondition.length; i++) {
      if (
        gameControlModule.winningCondition[i].every((x) =>
          gameBoard.board[gameBoard.currentPlayer].includes(x)
        )
      ) {
        console.log(`Player ${gameBoard.currentPlayer} win!`);
        gameBoard.score[gameBoard.currentPlayer] += 1;
        point[gameBoard.currentPlayer].textContent =
          gameBoard.score[gameBoard.currentPlayer];
        clear();
      }
    }
  }

  function clear() {
    box.forEach((el) => (el.textContent = ""));
    changePlayer();
    gameBoard.clicks = 0;
    gameBoard.board = [[], []];
  }
  return { box, winningCondition, checkWin, changePlayer, clear };
})();

gameControlModule.clear();

const playerAction = (function () {
  gameControlModule.box.forEach((el) =>
    el.addEventListener("click", function () {
      if (
        gameBoard.board[0].includes(Number(el.dataset.number)) ||
        gameBoard.board[1].includes(Number(el.dataset.number))
      )
        return;

      gameControlModule.box[el.dataset.number].textContent = gameBoard.token;
      gameBoard.board[gameBoard.currentPlayer].push(Number(el.dataset.number));
      console.log(gameBoard.board[gameBoard.currentPlayer]);
      gameBoard.clicks++;
      gameControlModule.checkWin();
      gameControlModule.changePlayer();
      console.log(gameBoard.currentPlayer);
    })
  );
})();

const createPlayer = (playerName, playerNumber, playerToken) => {
  players[playerNumber].textContent = playerName;

  return { playerName, playerNumber, playerToken };
};

let igor = createPlayer("Igor", 0, "O");
let kinia = createPlayer("Kinia", 1, "X");
