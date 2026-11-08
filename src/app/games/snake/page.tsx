"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Page, Card } from "@/components/ui";
import {
  COLS,
  createGame,
  opposite,
  speedForScore,
  stepGame,
} from "@/lib/snake";
import type { Direction, SnakeGame, Vec } from "@/lib/snake";

const CELL = 20;
const SIZE = COLS * CELL;
const HIGH_SCORE_KEY = "sonet-snake-high-score";
const SNAKE_HEAD = "#17191D";
const SNAKE_BODY = "#315CBA";
const FOOD_COLOR = "#E5484D";
const GRID_COLOR = "#E5E7EB";
const BOARD_COLOR = "#F5F6F8";

type Status = "ready" | "playing" | "paused" | "over";

function drawGame(canvas: HTMLCanvasElement, game: SnakeGame) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  if (canvas.width !== SIZE * dpr) {
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = BOARD_COLOR;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  for (let i = 1; i < COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(SIZE, i * CELL);
    ctx.stroke();
  }
  // Food.
  ctx.fillStyle = FOOD_COLOR;
  ctx.beginPath();
  ctx.arc(game.food.x * CELL + CELL / 2, game.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
  ctx.fill();
  // Snake.
  game.snake.forEach((cell: Vec, i: number) => {
    ctx.fillStyle = i === 0 ? SNAKE_HEAD : SNAKE_BODY;
    const pad = i === 0 ? 1 : 2;
    ctx.fillRect(cell.x * CELL + pad, cell.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
  });
}

function readHighScore(): number {
  try {
    return Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<SnakeGame>(createGame());
  const queueRef = useRef<Direction[]>([]);
  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [foods, setFoods] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const statusRef = useRef<Status>("ready");

  // Keep the ref in sync so the interval and key handlers see the latest status.
  useEffect(() => {
    statusRef.current = status;
  });

  const draw = useCallback(() => {
    if (canvasRef.current) drawGame(canvasRef.current, gameRef.current);
  }, []);

  const endGame = useCallback(() => {
    const s = gameRef.current.score;
    setFinalScore(s);
    setStatus("over");
    setHighScore((prev) => {
      if (s > prev) {
        try {
          window.localStorage.setItem(HIGH_SCORE_KEY, String(s));
        } catch {
          // High score is a nice-to-have; the game works without storage.
        }
        return s;
      }
      return prev;
    });
  }, []);

  const tick = useCallback(() => {
    if (statusRef.current !== "playing") return;
    const next = queueRef.current.shift();
    const before = gameRef.current.score;
    gameRef.current = stepGame(gameRef.current, next);
    const after = gameRef.current.score;
    if (after !== before) {
      setScore(after);
      setFoods((f) => f + 1);
    }
    draw();
    if (!gameRef.current.alive) endGame();
  }, [draw, endGame]);

  // Read the saved high score after mount (localStorage is browser-only).
  // Deferred out of the effect body so mount does not set state synchronously.
  useEffect(() => {
    const timer = setTimeout(() => setHighScore(readHighScore()), 0);
    draw();
    return () => clearTimeout(timer);
  }, [draw]);

  // Game loop: restarts whenever the speed changes (foods eaten).
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(tick, speedForScore(score));
    return () => clearInterval(id);
  }, [status, foods, score, tick]);

  // Keyboard controls.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const dirMap: Record<string, Direction> = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
      };
      if (key === " ") {
        e.preventDefault();
        setStatus((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s));
        return;
      }
      const dir = dirMap[key];
      if (!dir) return;
      e.preventDefault();
      if (statusRef.current !== "playing") return;
      const last = queueRef.current[queueRef.current.length - 1] ?? gameRef.current.dir;
      if (dir !== last && dir !== opposite(last) && queueRef.current.length < 2) {
        queueRef.current.push(dir);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function queueDirection(dir: Direction) {
    if (statusRef.current !== "playing") return;
    const last = queueRef.current[queueRef.current.length - 1] ?? gameRef.current.dir;
    if (dir !== last && dir !== opposite(last) && queueRef.current.length < 2) {
      queueRef.current.push(dir);
    }
  }

  function startGame() {
    gameRef.current = createGame();
    queueRef.current = [];
    setScore(0);
    setFoods(0);
    setFinalScore(0);
    setStatus("playing");
    requestAnimationFrame(draw);
  }

  return (
    <Page
      title="Snake"
      eyebrow="Playable game"
      intro="The classic Snake game, right in your browser. Eat the red dots, grow longer, and don't hit the wall or yourself. Arrow keys or WASD work on a keyboard — the buttons below work on touch screens."
    >
      <p className="muted" style={{ marginTop: 0 }}>
        Score: <strong>{score}</strong> · High score: <strong>{highScore}</strong>
      </p>
      <div style={{ maxWidth: 440 }}>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          aria-label="Snake game board"
          style={{ width: "100%", height: "auto", display: "block", border: "1px solid #E5E7EB" }}
        />
      </div>

      {status === "ready" && (
        <Card title="Ready to play?">
          <p className="muted">Press Start and steer with your keyboard or the buttons below.</p>
          <p>
            <button type="button" className="btn" onClick={startGame}>
              Start game →
            </button>
          </p>
        </Card>
      )}
      {status === "playing" && (
        <p>
          <button type="button" className="btn" onClick={() => setStatus("paused")}>
            Pause
          </button>
        </p>
      )}
      {status === "paused" && (
        <Card title="Paused">
          <p className="muted">Take a breath — your snake is waiting.</p>
          <p>
            <button type="button" className="btn" onClick={() => setStatus("playing")}>
              Resume →
            </button>{" "}
            <button type="button" className="btn" onClick={startGame}>
              Restart
            </button>
          </p>
        </Card>
      )}
      {status === "over" && (
        <Card title="Game over">
          <p className="muted">
            Your score: <strong>{finalScore}</strong>
            {finalScore >= highScore && finalScore > 0 ? " — a new high score!" : ""}
          </p>
          <p>
            <button type="button" className="btn" onClick={startGame}>
              Play again →
            </button>
          </p>
        </Card>
      )}

      <div style={{ marginTop: 20, maxWidth: 440 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: 8, justifyContent: "center" }}>
          <span />
          <button type="button" className="btn" aria-label="Move up" onClick={() => queueDirection("up")}>
            ↑
          </button>
          <span />
          <button type="button" className="btn" aria-label="Move left" onClick={() => queueDirection("left")}>
            ←
          </button>
          <button type="button" className="btn" aria-label="Move down" onClick={() => queueDirection("down")}>
            ↓
          </button>
          <button type="button" className="btn" aria-label="Move right" onClick={() => queueDirection("right")}>
            →
          </button>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 24 }}>
        The high score is saved only in your browser. Nothing is sent to a SONET server.
      </p>
    </Page>
  );
}
