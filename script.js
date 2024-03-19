"use strict";

// QUERY SELECTORS //

const point = document.querySelectorAll(".point");
const playerInfo = document.querySelectorAll(".player");
const players = document.querySelector(".players");
const grid = document.querySelector(".grid_container");
const reset = document.querySelector(".reset");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal_overlay");
const box = document.querySelectorAll(".box");

// GAME BOARD MODULE //

const gameBoard = (function () {
  // const board = ["", "", "", "", "", "", "", "", ""];
  const board = [];

  let players = {};

  let score = [0, 0];

  let clicks = 0;

  let currentPlayer = 0;

  let token = "O";

  return {
    board,
    players,
    score,
    clicks,
    currentPlayer,
    token,
  };
})();

// GAME LOGIC //

let gameControlModule = (function () {
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

  function render() {
    box.forEach((el) => {
      el.textContent = gameBoard.board[el.dataset.number];
    });
  }

  function changePlayer() {
    if (gameBoard.clicks === 0) return;

    gameBoard.currentPlayer === 0
      ? ((gameBoard.currentPlayer = 1), (gameBoard.token = "X"))
      : ((gameBoard.currentPlayer = 0), (gameBoard.token = "O"));
  }

  function checkWin() {
    let isWinner = 0;

    let playerName =
      gameBoard.currentPlayer === 0
        ? gameBoard.players.p1.playerName
        : gameBoard.players.p2.playerName;

    for (let i = 0; i < gameControlModule.winningCondition.length; i++) {
      if (
        gameControlModule.winningCondition[i].every(
          (x) => gameBoard.board[x] === gameBoard.token
        )
      ) {
        console.log(`${playerName} win!`);

        gameBoard.score[gameBoard.currentPlayer] += 1;
        point[gameBoard.currentPlayer].textContent =
          gameBoard.score[gameBoard.currentPlayer];

        clear();

        isWinner = 1;
      }
    }

    if (
      gameBoard.board.filter((x) => x !== undefined).length === 9 &&
      isWinner === 0
    ) {
      console.log("Remis...");
      clear();
    }
  }

  function clear() {
    box.forEach((el) => (el.textContent = ""));
    changePlayer();
    gameBoard.clicks = 0;
    gameBoard.board = [];
  }
  return { render, winningCondition, changePlayer, checkWin, clear };
})();

// CREATE PLAYER FUNCTION //

const Player = (playerName, playerNumber, playerToken) => {
  playerInfo[playerNumber].textContent = playerName;

  return { playerName, playerNumber, playerToken };
};

// gameControlModule.clear();

// CLICK EVENTS //

const playerAction = (function () {
  box.forEach((el) =>
    el.addEventListener("click", function () {
      if (gameBoard.board[Number(el.dataset.number)] !== undefined) return;

      gameBoard.board[el.dataset.number] = gameBoard.token;

      gameControlModule.render();
      gameBoard.clicks++;
      gameControlModule.checkWin();
      gameControlModule.changePlayer();
    })
  );
})();

// MODAL AND RESET BUTTON ///////

modal.addEventListener("submit", function (e) {
  e.preventDefault();

  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");

  gameBoard.players.p1 = Player(player1.value, 0, "O");
  gameBoard.players.p2 = Player(player2.value, 1, "X");

  modal.style.setProperty("visibility", "hidden");
  modalOverlay.style.setProperty("visibility", "hidden");

  player1.value = player2.value = "";
});

reset.addEventListener("click", function () {
  gameControlModule.clear();

  gameBoard.score = [0, 0];
  gameBoard.players = {};
  gameBoard.board = [];

  point[0].textContent = point[1].textContent = 0;

  modal.style.setProperty("visibility", "visible");
  modalOverlay.style.setProperty("visibility", "visible");
});
