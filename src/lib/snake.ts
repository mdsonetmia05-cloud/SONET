// Pure Snake game logic — no DOM, no React. The page component renders it.
// The snake is a list of cells, head first. One step moves the head one cell
// in the current direction; eating food grows the snake and adds 10 points.

export type Vec = { x: number; y: number };
export type Direction = "up" | "down" | "left" | "right";

export type SnakeGame = {
  cols: number;
  rows: number;
  snake: Vec[];
  dir: Direction;
  food: Vec;
  score: number;
  alive: boolean;
};

export const COLS = 20;
export const ROWS = 20;
export const START_SPEED_MS = 140;
export const MIN_SPEED_MS = 70;
export const SPEED_STEP_MS = 4;
export const POINTS_PER_FOOD = 10;

const DELTAS: Record<Direction, Vec> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function opposite(dir: Direction): Direction {
  if (dir === "up") return "down";
  if (dir === "down") return "up";
  if (dir === "left") return "right";
  return "left";
}

/** Step delay for the current score: faster as the snake eats. */
export function speedForScore(score: number): number {
  const foods = Math.floor(score / POINTS_PER_FOOD);
  return Math.max(MIN_SPEED_MS, START_SPEED_MS - foods * SPEED_STEP_MS);
}

export function sameCell(a: Vec, b: Vec): boolean {
  return a.x === b.x && a.y === b.y;
}

export function randomFood(snake: Vec[], cols: number, rows: number, rand: () => number = Math.random): Vec {
  const occupied = new Set(snake.map((c) => `${c.x},${c.y}`));
  const free: Vec[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  if (free.length === 0) return { x: -1, y: -1 };
  return free[Math.floor(rand() * free.length)];
}

export function createGame(cols: number = COLS, rows: number = ROWS): SnakeGame {
  const cy = Math.floor(rows / 2);
  const cx = Math.floor(cols / 2);
  const snake: Vec[] = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
  return {
    cols,
    rows,
    snake,
    dir: "right",
    food: randomFood(snake, cols, rows),
    score: 0,
    alive: true,
  };
}

/**
 * Advance the game one step. `nextDir` is applied first unless it reverses
 * the snake. Returns a new game state; the input is not mutated.
 */
export function stepGame(game: SnakeGame, nextDir?: Direction): SnakeGame {
  if (!game.alive) return game;
  const dir = nextDir && nextDir !== opposite(game.dir) ? nextDir : game.dir;
  const d = DELTAS[dir];
  const head = game.snake[0];
  const newHead = { x: head.x + d.x, y: head.y + d.y };

  // Wall collision.
  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= game.cols || newHead.y >= game.rows) {
    return { ...game, dir, alive: false };
  }
  const eats = sameCell(newHead, game.food);
  // The tail cell frees up this step unless the snake grows.
  const body = eats ? game.snake : game.snake.slice(0, -1);
  if (body.some((c) => sameCell(c, newHead))) {
    return { ...game, dir, alive: false };
  }
  const snake = [newHead, ...body];
  if (!eats) {
    return { ...game, snake, dir };
  }
  const food = randomFood(snake, game.cols, game.rows);
  return { ...game, snake, dir, food, score: game.score + POINTS_PER_FOOD };
}
