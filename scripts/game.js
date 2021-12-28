const Player = (mark) => {
  const getMark = () => mark;

  return { getMark };
};

const gameboard = (function () {
  const _board = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    for (let i = 1; i <= _board.length; ++i) {
      document.querySelector(`#space-${i}`).textContent = _board[i - 1];
    }
  };

  const resetBoard = () => {
    document
      .querySelectorAll('*[id^="space-"]')
      .forEach((s) => (s.textContent = ""));
  };

  document.querySelector("#reset-button").addEventListener("click", resetBoard);

  return {
    renderBoard,
  };
})();

const game = (function () {
  const _players = [Player("X"), Player("O")];
  let _activePlayerIndex = 0;

  function renderPlayerInfo() {
    console.log("Rendering player info");
    const player1Info = document.querySelector("#player1");
    player1Info.textContent = `Player 1 ("${_players[0].getMark()}")`;
    const player2Info = document.querySelector("#player2");
    player2Info.textContent = `Player 2 ("${_players[1].getMark()}")`;
  }

  function _changeActivePlayer() {
    _activePlayerIndex = (_activePlayerIndex + 1) % 2;
  }

  let squares = document.querySelectorAll('*[id^="space-"]');
  console.log({ squares });
  squares.forEach((s) =>
    s.addEventListener("click", (e) => {
      if (e.target.textContent === "") {
        e.target.textContent = _players[_activePlayerIndex].getMark();
        _changeActivePlayer();
      }
    })
  );

  document
    .querySelector("#reset-button")
    .addEventListener("click", () => (_activePlayerIndex = 0));

  return { renderPlayerInfo, _players };
})();

gameboard.renderBoard();
game.renderPlayerInfo();
