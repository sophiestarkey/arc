export class Ball {
    // because the motion of the ball is not angular,
    // i chose to represent its position in cartesian
    // coords, despite the paddles using polar coords.
    private _x: number;
    private _y: number;
    private _radius: number;

    private _dir_x: number;
    private _dir_y: number;

    constructor()
    {
        this._x = 0;
        this._y = 0;
        this._radius = 0.5;

        this._dir_x = 1;
        this._dir_y = 0;
    }

    public update(dt: number): void
    {
        const SPEED = 8 * dt;
        this._x += this._dir_x * SPEED;
        this._y += this._dir_y * SPEED;
    }

    public draw(ctx: CanvasRenderingContext2D): void
    {
        const scale = Math.min(ctx.canvas.width, ctx.canvas.height) / 32;
        const center_x = ctx.canvas.width / 2;
        const center_y = ctx.canvas.height / 2;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.ellipse(center_x + this._x * scale, center_y + this._y * scale, this._radius * scale, this._radius * scale, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get radius(): number
    {
        return this._radius;
    }
}