export namespace Input {
    export enum MouseButton {
        Primary = 0,
        Auxiliary = 1,
        Secondary = 2
    }

    export function is_mouse_button_pressed(button: MouseButton): boolean
    {
        switch (button) {
            case MouseButton.Primary: return mb_primary;
            case MouseButton.Auxiliary: return mb_auxiliary;
            case MouseButton.Secondary: return mb_secondary;
        }
    }

    export function is_key_pressed(key: string): boolean
    {
        return keys.includes(key);
    }

    export function get_mouse_x(): number
    {
        return mouse_x;
    }

    export function get_mouse_y(): number
    {
        return mouse_y;
    }

    export function get_axis(negative_key: string, positive_key: string): number
    {
        const idx_neg = keys.indexOf(negative_key);
        const idx_pos = keys.indexOf(positive_key);

        if (idx_neg < idx_pos) return 1;
        else if (idx_neg > idx_pos) return -1;
        else return 0;
    }
}

const keys = new Array<string>();

let mb_primary = false;
let mb_auxiliary = false;
let mb_secondary = false;

let mouse_x = 0;
let mouse_y = 0;

window.addEventListener("keydown", (ev: KeyboardEvent) => {
    if (!keys.includes(ev.key)) keys.push(ev.key);
});

window.addEventListener("keyup", (ev: KeyboardEvent) => {
    const idx = keys.indexOf(ev.key);
    if (idx >= 0) keys.splice(idx, 1);
});

window.addEventListener("mousedown", (ev: MouseEvent) => {
    switch (ev.button) {
        case Input.MouseButton.Primary: mb_primary = true; break;
        case Input.MouseButton.Auxiliary: mb_auxiliary = true; break;
        case Input.MouseButton.Secondary: mb_secondary = true; break;
    }
});

window.addEventListener("mouseup", (ev: MouseEvent) => {
    switch (ev.button) {
        case Input.MouseButton.Primary: mb_primary = false; break;
        case Input.MouseButton.Auxiliary: mb_auxiliary = false; break;
        case Input.MouseButton.Secondary: mb_secondary = false; break;
    }
});

window.addEventListener("mousemove", (ev: MouseEvent) => {
    mouse_x = ev.pageX;
    mouse_y = ev.pageY;
});

window.addEventListener("blur", (ev: FocusEvent) => {
    keys.length = 0;
    mb_primary = false;
    mb_auxiliary = false;
    mb_secondary = false;
});

window.addEventListener("contextmenu", (ev: MouseEvent) => ev.preventDefault());