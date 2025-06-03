export namespace Geometry {
    export interface Capsule {
        start_x: number;
        start_y: number;
        end_x: number;
        end_y: number;
        radius: number;
    }

    export interface Arc {
        x: number;
        y: number;
        radius: number;
        start_angle: number;
        end_angle: number;
        normal_r: number;
    }

    export interface Line {
        start_x: number;
        start_y: number;
        end_x: number;
        end_y: number;
        normal_x: number;
        normal_y: number;
    }

    export interface Point {
        x: number;
        y: number;
    }

    export function collide(capsule: Capsule, shape: Arc | Line | Point): number
    {
        if ("radius" in shape) {
            return collide_arc(capsule, shape);
        } else if ("start_x" in shape) {
            return collide_line(capsule, shape);
        } else {
            return collide_point(capsule, shape);
        }
    }

    function collide_arc(capsule: Capsule, arc: Arc): number
    {
        let t: number, angle: number;

        const dx = capsule.end_x - capsule.start_x;
        const dy = capsule.end_y - capsule.start_y;
        const r = arc.radius + capsule.radius * arc.normal_r;

        const a = squared_length(dx, dy);
        const b = 2 * dot(dx, dy, capsule.start_x - arc.x, capsule.start_y - arc.y);
        const c = squared_length(capsule.start_x - arc.x, capsule.start_y - arc.y) - r ** 2;

        t = lowest_root(a, b, c, 0, 1);
        if (Number.isNaN(t)) return NaN;

        angle = Math.atan2(capsule.start_y + t * dy - arc.y, capsule.start_x + t * dx - arc.x);
        if (angle_in_range(angle, arc.start_angle, arc.end_angle)) {
            return t;
        }

        t = lowest_root(a, b, c, t, 1);
        if (Number.isNaN(t)) return NaN;

        angle = Math.atan2(capsule.start_y + t * dy - arc.y, capsule.start_x + t * dx - arc.x);
        if (angle_in_range(angle, arc.start_angle, arc.end_angle)) {
            return t;
        }

        return NaN;
    }

    function collide_line(capsule: Capsule, line: Line): number
    {
        const offset_x = line.normal_x * capsule.radius;
        const offset_y = line.normal_y * capsule.radius;

        const denom = (capsule.start_x - capsule.end_x) * (line.start_y - line.end_y) - (capsule.start_y - capsule.end_y) * (line.start_x - line.end_x);
        const t = ((capsule.start_x - line.start_x - offset_x) * (line.start_y - line.end_y) - (capsule.start_y - line.start_y - offset_y) * (line.start_x - line.end_x)) / denom;
        const u = -((capsule.start_x - capsule.end_x) * (capsule.start_y - line.start_y - offset_y) - (capsule.start_y - capsule.end_y) * (capsule.start_x - line.start_x - offset_x)) / denom;

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return t;
        }

        return NaN;
    }

    function collide_point(capsule: Capsule, point: Point): number
    {
        const dx = capsule.end_x - capsule.start_x;
        const dy = capsule.end_y - capsule.start_y;

        const a = squared_length(dx, dy);
        const b = 2 * dot(dx, dy, capsule.start_x - point.x, capsule.start_y - point.y);
        const c = squared_length(capsule.start_x - point.x, capsule.start_y - point.y) - capsule.radius ** 2;

        return lowest_root(a, b, c, 0, 1);
    }
}

function dot(x_1: number, y_1: number, x_2: number, y_2: number): number
{
    return x_1 * x_2 + y_1 * y_2;
}

function squared_length(x: number, y: number): number
{
    return x ** 2 + y ** 2;
}

function angle_in_range(angle: number, min: number, max: number): boolean
{
    const min_to_angle = ((angle - min) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const min_to_max = ((max - min) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    return min_to_angle <= min_to_max;
}

function lowest_root(a: number, b: number, c: number, r_min: number, r_max: number): number
{
    const d = b ** 2 - 4 * a * c;

    if (d < 0) {
        return NaN;
    }

    const sqrt_d = Math.sqrt(d);
    let r_1 = (-b - sqrt_d) / (2 * a);
    let r_2 = (-b + sqrt_d) / (2 * a);

    if (r_1 > r_2) {
        const tmp = r_1;
        r_1 = r_2;
        r_2 = tmp;
    }

    if (r_1 > r_min && r_1 < r_max) {
        return r_1;
    }

    if (r_2 > r_min && r_2 < r_max) {
        return r_2;
    }

    return NaN;
}