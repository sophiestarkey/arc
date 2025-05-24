import { InputHandler } from "./input_handler.js";

export class Paddle {
    public input: InputHandler;

    // polar coords assume pole is (0, 0) and polar axis is (1, 0)
    // to keep consistency with CanvasRenderingContext2D arc() and
    // ellipse() behaviour. also assumes cw motion to be positive,
    // hence the 'inverted' rotation calculations seen below.
    private angle: number; // polar angle of paddle
    private arc: number; // paddle 'width', i.e. angle of paddle arc
    private radius: number; // distance from pole (0, 0)
    private depth: number; // paddle 'thickness'

    constructor()
    {
        this.angle = 0;
        this.arc = Math.PI / 4;
        this.radius = 15;
        this.depth = 1;

        this.input = new InputHandler();
    }

    public process_event(ev: Event): void
    {
        this.input.process_event(ev);
    }

    public update(dt: number): void
    {
        let input_x = this.input.get_axis_x();
        let input_y = this.input.get_axis_y();

        // is the player trying to move? (check if squared length != 0)
        if (input_x * input_x + input_y * input_y) {
            const s = Math.sin(-this.angle);
            const c = Math.cos(-this.angle);

            // angle between input vector and current paddle angle
            const diff = Math.acos(input_x * c - input_y * s);
            // direction of motion; cw is positive and ccw is negative
            const dir = Math.sign(input_x * s + input_y * c);

            const SPEED = Math.PI * dt;
            this.angle += Math.min(SPEED, diff) * dir;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void
    {
        const center_x = ctx.canvas.width / 2;
        const center_y = ctx.canvas.height / 2;
        const scale = 25;

        const start_angle = this.angle - this.arc / 2;
        const end_angle = this.angle + this.arc / 2;
        const start_radius = this.radius * scale;
        const end_radius = (this.radius + this.depth) * scale;

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