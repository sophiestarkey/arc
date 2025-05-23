import { Paddle } from "./paddle.js";

let ctx: CanvasRenderingContext2D;
let paddle: Paddle;

let last_update: DOMHighResTimeStamp;
const TIME_STEP = 16.67;

window.addEventListener("load", main);
window.addEventListener("resize", resize);

function main(): void
{
    let canvas = <HTMLCanvasElement> document.getElementById("viewport");
    ctx = canvas.getContext("2d")!;
    paddle = new Paddle();

    last_update = performance.now();

    resize();
    requestAnimationFrame(loop);
}

function resize(): void
{
    const dpr = window.devicePixelRatio;
    const rect = ctx.canvas.getBoundingClientRect();
    ctx.canvas.width = Math.round(rect.width * dpr);
    ctx.canvas.height = Math.round(rect.height * dpr);
}

function loop(now: DOMHighResTimeStamp): void
{
    while (now - last_update >= TIME_STEP) {
        paddle.update(TIME_STEP / 1000);
        last_update += TIME_STEP;
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    paddle.draw(ctx);
    requestAnimationFrame(loop);
}