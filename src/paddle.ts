import { Input } from "./input.js";

export class Paddle {
    public move_left_key: string;
    public move_right_key: string;
    public move_up_key: string;
    public move_down_key: string;

    private _angle: number; // polar angle of paddle
    private _arc: number; // paddle 'width', i.e. angle of paddle arc
    private _radius: number; // distance from pole (0, 0)
    private _depth: number; // paddle 'thickness'

    constructor()
    {
        this.move_left_key = "a";
        this.move_right_key = "d";
        this.move_up_key = "w";
        this.move_down_key = "s";

        this._angle = 0;
        this._arc = Math.PI / 4;
        this._radius = 15;
        this._depth = 1;
    }

    public update(dt: number): void
    {
        let input_x = Input.get_axis(this.move_left_key, this.move_right_key);
        let input_y = Input.get_axis(this.move_up_key, this.move_down_key);

        const length = Math.hypot(input_x, input_y);
        input_x = length ? input_x / length : 0;
        input_y = length ? input_y / length : 0;

        // is the player trying to move?
        if (length) {
            let diff = Math.atan2(input_y, input_x) - this._angle;
            diff = (diff % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            const dir = diff < Math.PI ? 1 : -1;

            const SPEED = Math.PI * dt;
            this._angle += Math.min(SPEED, diff) * dir;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void
    {
        const start_angle = this._angle - this._arc / 2;
        const end_angle = this._angle + this._arc / 2;
        const end_radius = this._radius + this._depth;

        ctx.beginPath();
        draw_arc(ctx, 0, 0, this._radius, end_radius, start_angle, end_angle);
        ctx.fill();
    }

    public get angle(): number
    {
        return this._angle;
    }

    public get arc(): number
    {
        return this._arc;
    }

    public get radius(): number
    {
        return this._radius;
    }

    public get depth(): number
    {
        return this._depth;
    }
}

function draw_arc(ctx: CanvasRenderingContext2D, x: number, y: number, start_radius: number, end_radius: number, start_angle: number, end_angle: number): void
{
        ctx.arc(x, y, start_radius, end_angle, start_angle, true);
        ctx.arc(x, y, end_radius, start_angle, end_angle);
        ctx.closePath();
}