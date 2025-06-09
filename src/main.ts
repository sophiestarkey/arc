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

function main(): void
{
    let canvas = <HTMLCanvasElement> document.getElementById("viewport");
    ctx = canvas.getContext("2d")!;
    ball = new Ball();

    paddle_1 = new Paddle();
    paddle_1.move_left_key = "a";
    paddle_1.move_right_key = "d";
    paddle_1.move_up_key = "w";
    paddle_1.move_down_key = "s";
    paddle_1.fill_style = "#FF0000";

    paddle_2 = new Paddle();
    paddle_2.move_left_key = "ArrowLeft";
    paddle_2.move_right_key = "ArrowRight";
    paddle_2.move_up_key = "ArrowUp";
    paddle_2.move_down_key = "ArrowDown";
    paddle_2.fill_style = "#00FFFF";

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
    paddle_1.draw(ctx);
    paddle_2.draw(ctx);
    requestAnimationFrame(loop);
}