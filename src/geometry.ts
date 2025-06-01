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
        convex: boolean;
    }

    export interface Line {
        start_x: number;
        start_y: number;
        end_x: number;
        end_y: number;
    }

    export interface Point {
        x: number;
        y: number;
    }
}