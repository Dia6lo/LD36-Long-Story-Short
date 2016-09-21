declare class FinalAnimationAction {
    animation: string;
    frame: number;
    constructor(frame?: number, animation?: string);
}
declare class Animation {
    private animators;
    private currentFrame;
    finalAction: FinalAnimationAction;
    frameCount: number;
    constructor(frameCount: number);
    run(frame?: number): void;
    setAnimator(animator: Animator): void;
    advance(frameCount: number, object: RenderObject): FinalAnimationAction;
    static loop(frame?: number): FinalAnimationAction;
    static goto(frame: number, animation: string): FinalAnimationAction;
}
declare class AnimationCollection {
    private animations;
    set(name: string, animation: Animation): void;
    get(name: string): Animation;
}
declare enum Interpolation {
    None = 0,
    Linear = 1,
}
declare abstract class Animator {
    frames: KeyFrame<any>[];
    apply(object: RenderObject, frame: number): void;
    protected abstract applyValue(object: RenderObject, value: any): void;
    protected abstract interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any;
    abstract getName(): string;
}
declare class KeyFrame<T> {
    value: T;
    interpolation: Interpolation;
    constructor(value: T, interpolation?: Interpolation);
}
declare class GenericAnimator<TObject extends RenderObject, TValue> extends Animator {
    frames: KeyFrame<TValue>[];
    private name;
    constructor(name: string);
    setFrame(frame: number, value: TValue, interpolation?: Interpolation): void;
    applyValue(object: TObject, value: any): void;
    getName(): string;
    interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any;
}
declare class Vector2Mutator {
    private origin;
    constructor(vector: Vector2);
    add(value: Vector2 | number): Vector2Mutator;
    subtract(value: Vector2): Vector2Mutator;
    multiply(value: Vector2 | number): Vector2Mutator;
    divide(value: Vector2 | number): Vector2Mutator;
    private apply(value, func);
}
declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(value: Vector2 | number): Vector2;
    subtract(value: Vector2 | number): Vector2;
    multiply(value: Vector2 | number): Vector2;
    divide(value: Vector2 | number): Vector2;
    private combine(value, func);
    clone(): Vector2;
    mutate(): Vector2Mutator;
    static zero: Vector2;
    static half: Vector2;
    static one: Vector2;
}
declare class Vector2Animator<T extends RenderObject> extends GenericAnimator<T, Vector2> {
    interpolate(amount: number, from: Vector2, to: Vector2, interpolation: Interpolation): Vector2;
}
declare class NumberAnimator<T extends RenderObject> extends GenericAnimator<T, number> {
    interpolate(amount: number, from: number, to: number, interpolation: Interpolation): number;
}
declare class VectorGraphics {
    private canvas;
    constructor(canvas: CanvasRenderingContext2D);
    drawRect(color: Color, x: number, y: number, width: number, height: number): VectorGraphics;
}
declare class Renderer {
    view: HTMLCanvasElement;
    backgroundColor: Color;
    vectorGraphics: VectorGraphics;
    private context;
    constructor(width: number, height: number);
    width: number;
    height: number;
    render(renderObject: RenderObject): void;
    renderTexture(texture: Texture, x?: number, y?: number, width?: number, height?: number): void;
    private renderUndefinedTexture(x?, y?, width?, height?);
    translate(x: number, y: number): void;
    rotate(angle: number): void;
    scale(x: number, y: number): void;
    save(): void;
    restore(): void;
    clip(x: number, y: number, width: number, height: number): void;
    flush(): void;
}
declare class AudioPlayer {
    view: HTMLDivElement;
    private audioElements;
    private freeAudioElements;
    constructor();
    play(source: string, loop?: boolean): void;
    private getFreeAudioElements();
}
declare class Application {
    view: HTMLDivElement;
    renderer: Renderer;
    root: RenderObject;
    audio: AudioPlayer;
    fps: number;
    private time;
    constructor(width?: number, height?: number);
    run(): void;
    render(time: number): void;
}
declare class Color {
    private rgb;
    constructor(rgb: number);
    toHex(): string;
    static fromComponents(r: number, g: number, b: number): Color;
    static black: Color;
    static red: Color;
    static green: Color;
    static blue: Color;
}
interface Array<T> {
    last(filter?: (element: T, index: number) => boolean): T;
    lastOrDefault(filter?: (element: T, index: number) => boolean): T;
    first(filter?: (element: T, index: number) => boolean): T;
    firstOrDefault(filter?: (element: T, index: number) => boolean): T;
}
interface Math {
    lerp(amount: number, from: number, to: number): number;
}
declare class Mechanism {
    static version: string;
    static helloWorld(): void;
}
declare class NotImplementedError implements Error {
    name: string;
    message: string;
    constructor(message?: string);
}
declare class RenderObject {
    children: RenderObject[];
    parent: RenderObject;
    animations: AnimationCollection;
    private currentAnimation;
    addChild(container: RenderObject): void;
    removeChild(container: RenderObject): boolean;
    render(renderer: Renderer): void;
    beforeRender(renderer: Renderer): void;
    afterRender(renderer: Renderer): void;
    update(): void;
    runAnimation(name: string, frame?: number): void;
    runChildAnimation(name: string): void;
}
declare class Widget extends RenderObject {
    children: Widget[];
    position: Vector2;
    scale: Vector2;
    rotation: number;
    pivot: Vector2;
    size: Vector2;
    beforeRender(renderer: Renderer): void;
    afterRender(renderer: Renderer): void;
    x: number;
    y: number;
    width: number;
    height: number;
    addChild(widget: Widget): void;
    static positionAnimator: () => Vector2Animator<RenderObject>;
    static scaleAnimator: () => Vector2Animator<RenderObject>;
    static pivotAnimator: () => Vector2Animator<RenderObject>;
    static sizeAnimator: () => Vector2Animator<RenderObject>;
    static rotationAnimator: () => NumberAnimator<RenderObject>;
}
declare class Texture {
    source: HTMLImageElement;
    constructor(source?: HTMLImageElement);
    static fromImage(url: string): Texture;
    width: number;
    height: number;
}
declare class Sprite extends Widget {
    texture: Texture;
    constructor(texture?: Texture);
    static fromImage(url: string): Sprite;
    render(renderer: Renderer): void;
    static textureAnimator: () => GenericAnimator<Sprite, Texture>;
}
