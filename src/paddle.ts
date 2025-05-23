export class Paddle {
    private angle: number;
    private radius: number;
    private depth: number;
    private distance: number;

    constructor()
    {
        this.angle = 0;
        this.radius = Math.PI / 4;
        this.depth = 1;
        this.distance = 15;
    }

    public update(dt: number): void
    {
        this.angle += Math.PI / 3 * dt;
    }

    public draw(ctx: CanvasRenderingContext2D): void
    {
        const center_x = ctx.canvas.width / 2;
        const center_y = ctx.canvas.height / 2;
        const scale = 25;

        ctx.fillStyle = "white";

        const start_angle = this.angle - this.radius / 2;
        const end_angle = this.angle + this.radius / 2;
        const start_radius = this.distance * scale;
        const end_radius = (this.distance + this.depth) * scale;

        ctx.beginPath();
        draw_arc(ctx, center_x, center_y, start_radius, end_radius, start_angle, end_angle);
        ctx.fill();
    }
}

function draw_arc(ctx: CanvasRenderingContext2D, x: number, y: number, start_radius: number, end_radius: number, start_angle: number, end_angle: number): void
{
        ctx.arc(x, y, start_radius, end_angle, start_angle, true);
        ctx.arc(x, y, end_radius, start_angle, end_angle);
        ctx.closePath();
}