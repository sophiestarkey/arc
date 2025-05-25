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
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.ellipse(this._x, this._y, this._radius, this._radius, 0, 0, 2 * Math.PI);
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