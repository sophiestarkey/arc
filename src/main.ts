import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

let ctx: CanvasRenderingContext2D;
let ball: Ball;
let paddle_1: Paddle;
let paddle_2: Paddle;

let last_update: DOMHighResTimeStamp;
const TIME_STEP = 16.67;

window.addEventListener("load", main);
window.addEventListener("resize", resize);
window.addEventListener("keydown", process_event);
window.addEventListener("keyup", process_event);

function main(): void
{
    let canvas = <HTMLCanvasElement> document.getElementById("viewport");
    ctx = canvas.getContext("2d")!;
    ball = new Ball();
    paddle_1 = new Paddle();
    paddle_2 = new Paddle();

    paddle_2.input.left_key = "ArrowLeft";
    paddle_2.input.right_key = "ArrowRight";
    paddle_2.input.up_key = "ArrowUp";
    paddle_2.input.down_key = "ArrowDown";

    last_update = performance.now();

    resize();
    requestAnimationFrame(loop);
}

function resize(): void
{
    const dpr = window.devicePixelRatio || 1;
    const rect = ctx.canvas.getBoundingClientRect();
    ctx.canvas.width = Math.round(rect.width * dpr);
    ctx.canvas.height = Math.round(rect.height * dpr);
}

function process_event(ev: Event): void
{
    paddle_1.process_event(ev);
    paddle_2.process_event(ev);
}

function loop(now: DOMHighResTimeStamp): void
{
    while (now - last_update >= TIME_STEP) {
        ball.update(TIME_STEP / 1000);
        paddle_1.update(TIME_STEP / 1000);
        paddle_2.update(TIME_STEP / 1000);
        last_update += TIME_STEP;
    }

    ctx.reset();

    const center_x = ctx.canvas.width / 2;
    const center_y = ctx.canvas.height / 2;
    const scale = Math.min(ctx.canvas.width, ctx.canvas.height) / 32;

    ctx.translate(center_x, center_y);
    ctx.scale(scale, scale);

    ctx.globalCompositeOperation = "screen";

    ball.draw(ctx);
    ctx.fillStyle = "#FF0000";
    paddle_1.draw(ctx);
    ctx.fillStyle = "#00FFFF";
    paddle_2.draw(ctx);
    requestAnimationFrame(loop);
}