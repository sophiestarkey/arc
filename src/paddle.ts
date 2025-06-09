import { Input } from "./input.js";

export class Paddle {
    public move_left_key: string;
    public move_right_key: string;
    public move_up_key: string;
    public move_down_key: string;
    public fill_style: string | CanvasGradient | CanvasPattern;

    private _rotation: number;
    private _angle: number;
    private _radius: number;
    private _depth: number;

    constructor()
    {
        this.move_left_key = "";
        this.move_right_key = "";
        this.move_up_key = "";
        this.move_down_key = "";
        this.fill_style = "white";

        this._rotation = 0;
        this._angle = Math.PI / 4;
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
            let diff = Math.atan2(input_y, input_x) - this._rotation;
            diff = (diff % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            const dir = diff < Math.PI ? 1 : -1;

            const SPEED = Math.PI * dt;
            this._rotation += Math.min(SPEED, diff) * dir;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void
    {
        ctx.fillStyle = this.fill_style;
        ctx.beginPath();
        ctx.arc(0, 0, this._radius, this._rotation + this._angle / 2, this._rotation - this._angle / 2, true);
        ctx.arc(0, 0, this._radius + this._depth, this._rotation - this._angle / 2, this._rotation + this._angle / 2);
        ctx.closePath();
        ctx.fill();
    }

    public get rotation(): number
    {
        return this._rotation;
    }

    public get angle(): number
    {
        return this._angle;
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