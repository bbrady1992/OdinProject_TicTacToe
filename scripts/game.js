const Player = (mark) => {
  const getMark = () => mark;
};

const gameboard = (function () {
  const _board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  const report = () => console.log("Herp");
  const setPlayers = (player1, player2) => {};

  const playerWins = () => {
    // TODO (bbrady) - implement this
  };

  return {
    report,
    setPlayers,
  };
})();

gameboard.report();
