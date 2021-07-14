const Player = (mark) => {
  const getMark = () => mark;

  return {getMark};
};

const gameboard = (function () {
  const _board = ["X", "X", "X", "X", "X", "X", "X", "X", "O"];

  const renderBoard = () => {
    for (let i = 1; i <= _board.length; ++i) {
      document.querySelector(`#space-${i}`).textContent = _board[i - 1];
    }
  }

  return {
    renderBoard
  };
})();

const game = (function () {
  const _players = [Player("X"), Player("O")];
  const _activePlayer = _players[0];

  function renderPlayerInfo() {
    console.log("Rendering player info");
    const player1Info = document.querySelector("#player1");
    player1Info.textContent = `Player 1 ("${_players[0].getMark()}")`;
    const player2Info = document.querySelector("#player2");
    player2Info.textContent = `Player 2 ("${_players[1].getMark()}")`;
  };

  return {renderPlayerInfo, _players};
})();

gameboard.renderBoard();
game.renderPlayerInfo();