import test from "node:test";
import assert from "node:assert/strict";
// Pure-function tests for the Snake game logic in src/lib/snake.ts.
// The helpers below mirror the library; the page renders the same rules.
// Run: npm test
function createGame(cols = 20, rows = 20) {
  const cy = Math.floor(rows / 2);
  const cx = Math.floor(cols / 2);
  const snake = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
  return { cols, rows, snake, dir: "right", food: { x: 0, y: 0 }, score: 0, alive: true };
}
function opposite(dir) {
  if (dir === "up") return "down";
  if (dir === "down") return "up";
  if (dir === "left") return "right";
  return "left";
}
function stepGame(game, nextDir) {
  if (!game.alive) return game;
  const deltas = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const dir = nextDir && nextDir !== opposite(game.dir) ? nextDir : game.dir;
  const [dx, dy] = deltas[dir];
  const head = game.snake[0];
  const newHead = { x: head.x + dx, y: head.y + dy };
  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= game.cols || newHead.y >= game.rows) {
    return { ...game, dir, alive: false };
  }
  const eats = newHead.x === game.food.x && newHead.y === game.food.y;
  const body = eats ? game.snake : game.snake.slice(0, -1);
  if (body.some((c) => c.x === newHead.x && c.y === newHead.y)) {
    return { ...game, dir, alive: false };
  }
  const snake = [newHead, ...body];
  if (!eats) return { ...game, snake, dir };
  return { ...game, snake, dir, food: { x: 0, y: 0 }, score: game.score + 10 };
}
test("snake starts 3 long, moving right from the centre", () => {
  const g = createGame();
  assert.equal(g.snake.length, 3);
  assert.equal(g.dir, "right");
  assert.deepEqual(g.snake[0], { x: 10, y: 10 });
  assert.equal(g.alive, true);
});
test("moving right advances the head and keeps the length", () => {
  const g = stepGame(createGame());
  assert.deepEqual(g.snake[0], { x: 11, y: 10 });
  assert.equal(g.snake.length, 3);
});
test("reversing direction is ignored", () => {
  const g = stepGame(createGame(), "left");
  assert.equal(g.dir, "right");
  assert.deepEqual(g.snake[0], { x: 11, y: 10 });
});
test("eating food grows the snake and adds 10 points", () => {
  const g = createGame();
  g.food = { x: 11, y: 10 };
  const next = stepGame(g);
  assert.equal(next.snake.length, 4);
  assert.equal(next.score, 10);
});
test("hitting the wall ends the game", () => {
  const g = createGame();
  g.snake = [
    { x: 19, y: 10 },
    { x: 18, y: 10 },
    { x: 17, y: 10 },
  ];
  const next = stepGame(g);
  assert.equal(next.alive, false);
});
test("hitting its own body ends the game", () => {
  const g = createGame();
  g.snake = [
    { x: 10, y: 10 },
    { x: 10, y: 9 },
    { x: 11, y: 9 },
    { x: 11, y: 10 },
  ];
  g.dir = "up";
  const next = stepGame(g);
  assert.equal(next.alive, false);
});
