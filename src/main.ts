let ctx: CanvasRenderingContext2D;

let last_update: DOMHighResTimeStamp;
const TIME_STEP = 16.67;

window.addEventListener("load", main);
window.addEventListener("resize", resize);

function main(): void
{
    let canvas = <HTMLCanvasElement> document.getElementById("viewport");
    ctx = canvas.getContext("2d")!;

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
        last_update += TIME_STEP;
    }

    requestAnimationFrame(loop);
}