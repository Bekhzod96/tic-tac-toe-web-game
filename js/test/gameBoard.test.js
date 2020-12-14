import { gameBoard } from '../index';

const tic = gameBoard();

test('Get board', () => {
  expect(tic.board).toEqual({
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
  });
});

test('Get board cleared', () => {
  expect(tic.cleanBoard()).toEqual({
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
  });
});

test('check wining combination', () => {
  expect(tic.checkWin()).toEqual(false);
});

test('Adding sign in board', () => {
  expect(tic.boardCellUpdate(1, 'X')).toEqual({
    1: 'X', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
  });
});

test('Adding sign in board', () => {
  expect(tic.boardCellUpdate(3, 'X')).toEqual({
    1: 'X', 2: '', 3: 'X', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
  });
});

test('Adding sign in board', () => {
  expect(tic.boardCellUpdate(5, 'O')).toEqual({
    1: 'X', 2: '', 3: 'X', 4: '', 5: 'O', 6: '', 7: '', 8: '', 9: '',
  });
});