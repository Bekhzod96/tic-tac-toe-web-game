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

	const checkWin = () => {
		return winCase.some((ar) => {
			return (
				board[ar[0]] === board[ar[1]] &&
				board[ar[1]] === board[ar[2]] &&
				board[ar[2]] !== ''
			);
		});
	};

	const attacheLiseter = (func) => {
		cells.forEach((el) => {
			el.onclick = func;
		});
	};

	const setBoard = (newState) => (board = { ...newState });
	const getCellValue = (i) => Object.values(board)[i];

	const boardCellUpdate = (index, sign) => {
		if (getCellValue(index - 1) === '') {
			board[index] = sign;
			render();
		}
		return false;
	};

	const render = () => {
		cells.forEach((el, i) => {
			el.innerText = getCellValue(i);
		});
		return true;
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

const player = (Pname, Psigh) => {
	const name = Pname;
	const sign = Psigh;

	return { name, sign };
};

const game = (pl1, pl2) => {
	let play1 = pl1;
	let play2 = pl2;
	let gameStat = true;
	let sign = '';
	let id = 0;
	let countMove = 1;
	let board = gameBoard();

	const onMove = (e) => {
		id = parseInt(e.currentTarget.id);
		console.log(sign);
		if (countMove <= 9 && board.getCellValue(id) !== '') {
			sign = countMove % 2 === 0 ? 'O' : 'X';
			countMove += 1;
			id = parseInt(e.currentTarget.id);
			board.boardCellUpdate(id, sign);
			gameStat = board.checkWin() ? false : true;
		} else {
			alert('Game Over!');
		}
	};

	const initGame = () => {
		let pl1 = find('.pl1');
		let pl2 = find('.pl2');
		if (pl1.value && pl2.value) {
			play1 = player(pl1.value, 'X');
			play2 = player(pl2.value, 'O');
			find('.welcome').classList.add('d-none');
			find('.board').classList.remove('d-none');
			pl1.value = '';
			pl2.value = '';
			board.attacheLiseter(onMove);
		} else {
			alert('Please Enter Player Name');
		}
	};

	startGameButton.onclick = (e) => {
		e.preventDefault();
		initGame();
	};
	return {};
};

const find = (sel) => {
	return document.querySelector(sel);
};

// Selectors and Variables
const cells = document.querySelectorAll('.cell');
const startGameButton = find('.startGame');
let players = [];

window.onload = () => {
	const newGame = game();
};
