// -----------------DOM monipulation-----------

const find = (sel) => document.querySelector(sel);
const cells = document.querySelectorAll('.cell');
const startBtn = document.querySelectorAll('.start');
const restartBtn = document.querySelectorAll('.restart');
const pl1 = find('.pl1');
const pl2 = find('.pl2');
const startGameButton = find('.startGame'); // eslint-disable-line
const gameOver = find('.game-over');
const win = find('.win');
const board = find('.board');
const winner = find('.winner');
const firstBadge = find('.pl1-badge');
const secondBadge = find('.pl2-badge');
const pl1Score = find('.pl1-score');
const pl2Score = find('.pl2-score');
const totalScore = find('.total-score');
const pl1Name = find('.pl1Name');
const pl2Name = find('.pl2Name');
const quit = find('.quit');

const renderGameBoard = () => {
  find('.welcome').classList.add('d-none');
  find('.board').classList.remove('d-none');
  quit.classList.remove('d-none');
};
const renderGameOver = () => {
  board.classList.add('d-none');
  gameOver.classList.remove('d-none');
};

const renderWin = (str) => {
  board.classList.add('d-none');
  winner.innerText = str;
  win.classList.remove('d-none');
};

const reloadWind = () => {
  location.reload(); // eslint-disable-line
};

const renderPayerBadge = (players, rounds) => {
  firstBadge.classList.remove('d-none');
  firstBadge.innerText = `${players[0].name} -> ${players[0].sign}`;
  pl1Score.innerText = `${players[0].score}`;
  pl1Name.innerText = `${players[0].name}`;
  totalScore.innerText = `${rounds}`;
  secondBadge.classList.remove('d-none');
  secondBadge.innerText = `${players[1].name} -> ${players[1].sign}`;
  pl2Score.innerText = `${players[1].score}`;
  pl2Name.innerText = `${players[1].name}`;
};

const toggleBage = () => {
  firstBadge.classList.toggle('badge-success');
  secondBadge.classList.toggle('badge-success');
};

const renderContinue = () => {
  gameOver.classList.add('d-none');
  win.classList.add('d-none');
  board.classList.remove('d-none');
};

// ================== Logic Part ===========================
const gameBoard = () => {
  let board = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };

  const winCase = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const checkWin = () => winCase.some(
    (ar) => board[ar[0]] === board[ar[1]]
        && board[ar[1]] === board[ar[2]]
        && board[ar[2]] !== '',
  );

  const attachEnentListener = (func) => {
    cells.forEach((el) => {
      el.onclick = func;
    });
  };
  const getCellValue = (i) => Object.values(board)[i];

  const render = () => {
    cells.forEach((el, i) => {
      el.innerText = getCellValue(i);
    });
  };

  const cleanBoard = () => {
    board = {
      1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
    };
    render();
  };


  const boardCellUpdate = (index, sign) => {
    board[index] = sign;
    render();
  };

  return {
    cleanBoard,
    getCellValue,
    checkWin,
    render,
    attachEnentListener,
    boardCellUpdate,
  };
};

export const player = (name, i) => {
  const signs = ['X', 'O'];
  const sign = signs[i];
  const score = 0;
  return { name, sign, score };
};

const game = () => {
  let players = [];
  let sign = '';
  let rounds = 0;
  let id = 0;
  let countMove = 1;
  const board = gameBoard();
  const findWinner = () => {
    const i = sign === players[0].sign ? 0 : 1;
    players[i].score += 1;
    return players[i].name;
  };

  const toggleSign = () => {
    sign = countMove % 2 === 0 ? players[1].sign : players[0].sign;
    countMove += 1;
    toggleBage();
  };

  const onMove = (e) => {
    id = parseInt(e.currentTarget.id); // eslint-disable-line

    if (board.getCellValue(id - 1) === '') {
      toggleSign();
      board.boardCellUpdate(id, sign);
    }
    setTimeout(() => {
      if (board.checkWin() || countMove >= 10) {
        rounds += 1;
        if (board.checkWin()) {
          renderWin(findWinner());
        } else {
          renderGameOver();
        }
      }
    }, 0);
  };

  const continuePlay = () => {
    board.cleanBoard();
    countMove = 1;
    toggleSign();
    renderContinue();
    renderPayerBadge(players, rounds);
  };

  const initGame = () => {
    if (pl1.value && pl2.value) {
      players = [player(pl1.value, 0), player(pl2.value, 1)];
      pl1.value = '';
      pl2.value = '';
      renderGameBoard();
      renderPayerBadge(players, rounds);
      board.attachEnentListener(onMove);
      restartBtn.forEach((el) => {
        el.onclick = reloadWind;
      });
      quit.onclick = reloadWind;
      startBtn.forEach((el) => {
        el.onclick = continuePlay;
      });
    } else {
      $('#warning').modal();  // eslint-disable-line
    }
  };

  // =========== Click start button =============
  startGameButton.onclick = (e) => {
    e.preventDefault();
    initGame();
  };
  return {};
};

// =========== On Load= =====================
window.onload = () => {
  game();
};
