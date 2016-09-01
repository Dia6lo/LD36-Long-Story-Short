declare class Mechanism {
    static version: string;
    static helloWorld(): void;
}
declare class Renderer {
    view: HTMLCanvasElement;
    private context;
    private width;
    private height;
    constructor(width: number, height: number);
    render(sprite: Sprite): void;
    private flush();
}
declare class Sprite {
    texture: Texture;
    position: Vector2;
    constructor(texture: Texture);
    static fromImage(url: string): Sprite;
}
declare class Texture {
    source: HTMLImageElement;
    constructor(source: HTMLImageElement);
    static fromImage(url: string): Texture;
}
declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(value: Vector2): Vector2;
    subtract(value: Vector2): Vector2;
    clone(): Vector2;
    mutate(): Vector2Mutator;
}
declare class Vector2Mutator {
    private origin;
    constructor(vector: Vector2);
    add(value: Vector2): Vector2Mutator;
    subtract(value: Vector2): Vector2Mutator;
}
