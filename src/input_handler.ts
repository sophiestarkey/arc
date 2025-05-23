export class InputHandler {
    public left_key: string;
    public right_key: string;
    public up_key: string;
    public down_key: string;

    private axis_x: number;
    private axis_y: number;

    private left: boolean;
    private right: boolean;
    private up: boolean;
    private down: boolean;

    constructor()
    {
        this.left_key = "a";
        this.right_key = "d";
        this.up_key = "w";
        this.down_key = "s";

        this.axis_x = 0;
        this.axis_y = 0;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    }

    public process_event(ev: Event): void
    {
        if (ev.type == "keydown") {
            switch ((<KeyboardEvent> ev).key) {
            case this.left_key:
                this.left = true;
                this.recalc_axes();
                break;
            case this.right_key:
                this.right = true;
                this.recalc_axes();
                break;
            case this.up_key:
                this.up = true;
                this.recalc_axes();
                break;
            case this.down_key:
                this.down = true;
                this.recalc_axes();
                break;
            }
        } else if (ev.type == "keyup") {
            switch ((<KeyboardEvent> ev).key) {
            case this.left_key:
                this.left = false;
                this.recalc_axes();
                break;
            case this.right_key:
                this.right = false;
                this.recalc_axes();
                break;
            case this.up_key:
                this.up = false;
                this.recalc_axes();
                break;
            case this.down_key:
                this.down = false;
                this.recalc_axes();
                break;
            }
        }
    }

    public get_axis_x(): number
    {
        return this.axis_x;
    }

    public get_axis_y(): number
    {
        return this.axis_y;
    }

    private recalc_axes(): void
    {
        this.axis_x = 0;
        this.axis_y = 0;

        if (this.left) this.axis_x -= 1;
        if (this.right) this.axis_x += 1;
        if (this.up) this.axis_y -= 1;
        if (this.down) this.axis_y += 1;

        const len = Math.sqrt(this.axis_x * this.axis_x + this.axis_y * this.axis_y);
        this.axis_x /= len;
        this.axis_y /= len;
    }
}