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
    for (let i = 0; i < _board.length; ++i) {
      _board[i] = "";
    }
    //document
    //  .querySelectorAll('*[id^="space-"]')
    //  .forEach((s) => (s.textContent = ""));
  };

  const setSquareMark = (squareId, mark) => {
    _board[squareId - 1] = mark;
  };

  const playerWins = () => {
    const threeEqual = (s1, s2, s3) => {
      return s1 === s2 && s2 === s3 && s1 !== "";
    };

    return (
      threeEqual(_board[0], _board[1], _board[2]) ||
      threeEqual(_board[3], _board[4], _board[5]) ||
      threeEqual(_board[6], _board[7], _board[8]) ||
      threeEqual(_board[0], _board[3], _board[6]) ||
      threeEqual(_board[1], _board[4], _board[7]) ||
      threeEqual(_board[2], _board[5], _board[8]) ||
      threeEqual(_board[0], _board[4], _board[8]) ||
      threeEqual(_board[6], _board[4], _board[2])
    );
  };

  const boardFull = () => {
    return _board.every((s) => s !== "");
  };

  document.querySelector("#reset-button").addEventListener("click", () => {
    console.log("RESETTING GAMEBOARD");
    for (let i = 0; i < _board.length; ++i) {
      _board[i] = "";
    }
    document
      .querySelectorAll('*[id^="space-"]')
      .forEach((s) => (s.textContent = ""));
  });

  return {
    renderBoard,
    playerWins,
    setSquareMark,
    boardFull,
  };
})();

const game = (function () {
  const _players = [Player("X"), Player("O")];
  let _activePlayerIndex = 0;
  let _gameboard = null;
  let _gameWon = false;
  let _gamesWon = [0, 0];

  function renderPlayerInfo() {
    const player1Info = document.querySelector("#player1");
    player1Info.textContent = `Player 1 ("${_players[0].getMark()}") - ${
      _gamesWon[0]
    } games won`;
    const player2Info = document.querySelector("#player2");
    player2Info.textContent = `Player 2 ("${_players[1].getMark()}") - ${
      _gamesWon[1]
    } games won`;
  }

  function _changeActivePlayer() {
    _activePlayerIndex = (_activePlayerIndex + 1) % 2;
  }

  function setGameboard(gameboard) {
    _gameboard = gameboard;
  }

  let squares = document.querySelectorAll('*[id^="space-"]');
  squares.forEach((s) =>
    s.addEventListener("click", (e) => {
      if (e.target.textContent === "" && !_gameWon) {
        const squareId = parseInt(e.target.getAttribute("id").split("-")[1]);
        console.log(`Clicked square '${squareId}'`);
        _gameboard.setSquareMark(
          squareId,
          _players[_activePlayerIndex].getMark()
        );
        e.target.textContent = _players[_activePlayerIndex].getMark();
        if (_gameboard.playerWins()) {
          _gameWon = true;
          document.querySelector(
            "#win-banner"
          ).textContent = `Player ${_players[
            _activePlayerIndex
          ].getMark()} wins!`;
          _gamesWon[_activePlayerIndex] += 1;
          renderPlayerInfo();
        } else if (gameboard.boardFull()) {
          _gameWon = true;
          document.querySelector("#win-banner").textContent = "Tie";
        }
        _changeActivePlayer();
      }
    })
  );

  document.querySelector("#reset-button").addEventListener("click", () => {
    console.log("RESETTING GAME OBJECT");
    _activePlayerIndex = 0;
    _gameWon = false;
    document.querySelector("#win-banner").textContent = "";
  });

  return { renderPlayerInfo, setGameboard, _players };
})();

gameboard.renderBoard();
game.renderPlayerInfo();
game.setGameboard(gameboard);
