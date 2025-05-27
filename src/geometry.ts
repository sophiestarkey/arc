export class LineSegment {
    private _x_1: number;
    private _y_1: number;
    private _x_2: number;
    private _y_2: number;

    constructor(x_1: number, y_1: number, x_2: number, y_2: number)
    {
        this._x_1 = x_1;
        this._y_1 = y_1;
        this._x_2 = x_2;
        this._y_2 = y_2;
    }

    public intersect_arc(r: number, h: number, k: number, min_angle: number, max_angle: number): number
    {
        const t = this.intersect_circle(r, h, k);

        if (Number.isNaN(t)) return NaN;

        const x = this._x_1 + t * (this._x_2 - this._x_1);
        const y = this._y_1 + t * (this._y_2 - this._y_1);

        if (!angle_in_range(-Math.atan2(y, x), min_angle, max_angle)) {
            return NaN;
        }

        return t;
    }

    public intersect_circle(r: number, h: number, k: number): number
    {
        const a = (this._x_2 - this._x_1) ** 2 + (this._y_2 - this._y_1) ** 2;
        const b = 2 * (this._x_2 - this._x_1) * (this._x_1 - h) + 2 * (this._y_2 - this._y_1) * (this._y_1 - k);
        const c = (this._x_1 - h) ** 2 + (this._y_1 - k) ** 2 - r ** 2;

        return lowest_root(a, b, c, 1);
    }

    public intersect_line_segment(x_1: number, y_1: number, x_2: number, y_2: number): number
    {
        const denom = (this._x_1 - this._x_2) * (y_1 - y_2) - (this._y_1 - this._y_2) * (x_1 - x_2);
        const t = ((this._x_1 - x_1) * (y_1 - y_2) - (this._y_1 - y_1) * (x_1 - x_2)) / denom;
        const u = ((this._x_1 - this._x_2) * (this._y_1 - y_1) - (this._y_1 - this._y_2) * (this._x_1 - x_1)) / denom;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return t;
        }

        return NaN;
    }

}

function angle_in_range(theta: number, min: number, max: number): boolean
{
    // normalize into range (0, 2PI)
    theta = (theta % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);
    min = (min % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);
    max = (max % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);

    if (min > max) {
        // range (min, max) crosses 0
        return theta >= min || theta <= max;
    }

    return theta >= min && theta <= max;
}

function lowest_root(a: number, b: number, c: number, max: number = Infinity): number
{
    // calculate discriminant
    const dsc = b * b - 4 * a * c;

    if (dsc < 0) {
        // no real roots
        return NaN;
    }

    const sqrt_dsc = Math.sqrt(dsc);
    let r_1 = (-b - sqrt_dsc) / (2 * a);
    let r_2 = (-b + sqrt_dsc) / (2 * a);

    if (r_1 > r_2) {
        const tmp = r_2;
        r_2 = r_1;
        r_1 = tmp;
    }

    if (r_1 > 0 && r_1 < max) {
        return r_1;
    }

    if (r_2 > 0 && r_2 < max) {
        return r_2;
    }

    return NaN;
}