import { player } from '../index';

const p1 = player('hemant', 0);
const p2 = player('soni', 1);


test('Get player\'s name', () => {
  expect(p1.name).toBe('hemant');
  expect(p2.name).toBe('soni');
});

test('Get player\'s symbol', () => {
  expect(p1.sign).toBe('X');
  expect(p2.sign).toBe('O');
});

test('Get player\'s score', () => {
  expect(p1.score).toBe(0);
  expect(p2.score).toBe(0);
});

test('Get player\'s name', () => {
  expect(p1.name).not.toBe('rahul');
  expect(p2.name).not.toBe('son');
});
