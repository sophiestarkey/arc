export class Paddle {
    private rotation: number;
    private angle: number;
    private depth: number;
    private distance: number;

    private move_left: boolean;
    private move_right: boolean;
    private move_down: boolean;
    private move_up: boolean;

    constructor()
    {
        this.rotation = 0;
        this.angle = Math.PI / 4;
        this.depth = 1;
        this.distance = 15;

        this.move_left = false;
        this.move_right = false;
        this.move_up = false;
        this.move_down = false;
    }

    public process_event(ev: Event): void
    {
        switch (ev.type) {
            case "keydown":
                if ((<KeyboardEvent> ev).key == "a") this.move_left = true;
                if ((<KeyboardEvent> ev).key == "d") this.move_right = true;
                if ((<KeyboardEvent> ev).key == "w") this.move_up = true;
                if ((<KeyboardEvent> ev).key == "s") this.move_down = true;
                break;
            case "keyup":
                if ((<KeyboardEvent> ev).key == "a") this.move_left = false;
                if ((<KeyboardEvent> ev).key == "d") this.move_right = false;
                if ((<KeyboardEvent> ev).key == "w") this.move_up = false;
                if ((<KeyboardEvent> ev).key == "s") this.move_down = false;
                break;
        }
    }

    public update(dt: number): void
    {
        let input_x = 0;
        let input_y = 0;

        if (this.move_left) input_x -= 1;
        if (this.move_right) input_x += 1;
        if (this.move_up) input_y -= 1;
        if (this.move_down) input_y += 1;

        // normalize input vector
        let len = Math.sqrt(input_x * input_x + input_y * input_y);
        input_x /= len;
        input_y /= len;

        // is the player trying to move?
        if (len) {
            const s = Math.sin(-this.rotation);
            const c = Math.cos(-this.rotation);

            // angle between input vector and current paddle angle
            const diff = Math.acos(input_x * c - input_y * s);
            // direction of motion; cw is positive and ccw is negative
            const dir = Math.sign(input_x * s + input_y * c);

            const SPEED = Math.PI * dt;
            this.rotation += Math.min(SPEED, diff) * dir;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void
    {
        const center_x = ctx.canvas.width / 2;
        const center_y = ctx.canvas.height / 2;
        const scale = 25;

        ctx.fillStyle = "white";

        const start_angle = this.rotation - this.angle / 2;
        const end_angle = this.rotation + this.angle / 2;
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