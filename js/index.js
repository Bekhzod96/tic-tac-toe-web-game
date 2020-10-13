const gameBoard = (() => {
	let board = {
		1: '',
		2: 'X',
		3: '',
		4: '',
		5: '',
		6: '',
		7: '',
		8: '',
		9: '',
	};

	const setBoard = (newState) => (board = { ...newState });
	const getCellValue = (i) => Object.values(board)[i];

	return { setBoard, getCellValue };
})();
const cells = document.querySelectorAll('.cell');

const player = (Pname, Psigh) => {
	const name = Pname;
	const sign = Psigh;

	return { name, sign };
};

let players = [];

const find = (sel) => {
	return document.querySelector(sel);
};
const createPlayer = () => {
	let pl1 = find('.pl1');
	let pl2 = find('.pl2');
	if (pl1.value && pl2.value) {
		players.push(player(pl1.value, 'X'));
		players.push(player(pl2.value, 'O'));
		find('.welcome').classList.add('d-none');
		find('.board').classList.remove('d-none');
		pl1.value = '';
		pl2.value = '';
	} else {
		alert('Please Enter Player Name');
	}
};

const onCellClick = (e) => {
	console.log(e.currentTarget.id);
};

const renderBoard = () => {
	cells.forEach((el, i) => {
		el.innerText = gameBoard.getCellValue(i);
	});
};

window.onload = () => {
	const startGameButton = find('.startGame');
	startGameButton.onclick = (e) => {
		e.preventDefault();
		createPlayer();
	};

	cells.forEach((el) => {
		el.onclick = onCellClick;
	});
	renderBoard();
};
