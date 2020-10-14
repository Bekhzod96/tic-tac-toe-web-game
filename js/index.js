const find = (sel) => document.querySelector(sel);
const cells = document.querySelectorAll('.cell');
const startGameButton = find('.startGame');  // eslint-disable-line


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

  const checkWin = () => winCase.some((ar) => (
    board[ar[0]] === board[ar[1]] && board[ar[1]] === board[ar[2]] && board[ar[2]] !== ''
  ));

  const attacheLiseter = (func) => {
    cells.forEach((el) => {
      el.onclick = func;
    });
  };

  const setBoard = (newState) => {
    board = { ...newState };
    return board;
  };
  const getCellValue = (i) => Object.values(board)[i];

  const render = () => {
    cells.forEach((el, i) => {
      el.innerText = getCellValue(i);
    });
  };

  const boardCellUpdate = (index, sign) => {
    board[index] = sign;
    render();
  };


  return {
    setBoard,
    getCellValue,
    checkWin,
    render,
    attacheLiseter,
    boardCellUpdate,
  };
};

const player = (name, sign) => ({ name, sign });

const game = (pl1, pl2) => {
  let play1 = pl1;
  let play2 = pl2;
  let sign = '';
  let id = 0;
  let countMove = 1;
  const board = gameBoard();
  const findWinner = () => (sign === play1.sign ? play1.name : play2.name);

  const onMove = (e) => {
    id = parseInt(e.currentTarget.id); // eslint-disable-line

    if (board.getCellValue(id - 1) === '') {
      sign = countMove % 2 === 0 ? 'O' : 'X';
      countMove += 1;
      board.boardCellUpdate(id, sign);
    }
    if (board.checkWin() || countMove >= 10) {
      if (countMove >= 10) {
        alert('Game Over'); // eslint-disable-line
      } else {
        const word = `You win ${findWinner()}`;
        alert(word);  // eslint-disable-line
      }
      location.reload();  // eslint-disable-line
    }
  };


  const initGame = () => {
    const pl1 = find('.pl1');
    const pl2 = find('.pl2');
    if (pl1.value && pl2.value) {
      play1 = player(pl1.value, 'X');
      play2 = player(pl2.value, 'O');
      find('.welcome').classList.add('d-none');
      find('.board').classList.remove('d-none');
      pl1.value = '';
      pl2.value = '';
      board.attacheLiseter(onMove);
    } else {
      alert('Please Enter Player Name'); // eslint-disable-line
    }
  };

  startGameButton.onclick = (e) => {  // eslint-disable-line
    e.preventDefault();
    initGame();
  };
  return {};
};


window.onload = () => {
  game();
};
