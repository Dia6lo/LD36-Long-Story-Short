declare class FinalAnimationAction {
    animation?: string;
    frame: number;
    constructor(frame: number, animation?: string);
}
declare class Animation {
    private animators;
    private currentFrame;
    finalAction: FinalAnimationAction;
    frameCount: number;
    constructor(frameCount: number);
    run(frame?: number): void;
    setAnimator(animator: Animator): void;
    advance(frameCount: number, object: RenderObject): FinalAnimationAction | undefined;
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
    readonly name: string;
    protected constructor(name: string);
    apply(object: RenderObject, frame: number): void;
    protected abstract applyValue(object: RenderObject, value: any): void;
    protected abstract interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any;
}
declare class KeyFrame<T> {
    value: T;
    interpolation: Interpolation;
    constructor(value: T, interpolation?: Interpolation);
}
declare class GenericAnimator<TObject extends RenderObject, TValue> extends Animator {
    frames: KeyFrame<TValue>[];
    constructor(name: string);
    setFrame(frame: number, value: TValue, interpolation?: Interpolation): void;
    applyValue(object: TObject, value: any): void;
    interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any;
}
declare class Vector2Mutator {
    private readonly origin;
    constructor(vector: Vector2);
    add(value: Vector2 | number): Vector2Mutator;
    subtract(value: Vector2): Vector2Mutator;
    multiply(value: Vector2 | number): Vector2Mutator;
    divide(value: Vector2 | number): Vector2Mutator;
    private apply(value, fn);
}
declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): void;
    add(value: Vector2 | number): Vector2;
    subtract(value: Vector2 | number): Vector2;
    multiply(value: Vector2 | number): Vector2;
    divide(value: Vector2 | number): Vector2;
    private combine(value, fn);
    clone(): Vector2;
    mutate(): Vector2Mutator;
    static readonly zero: Vector2;
    static readonly half: Vector2;
    static readonly one: Vector2;
}
declare class Vector2Animator<T extends RenderObject> extends GenericAnimator<T, Vector2> {
    interpolate(amount: number, from: Vector2, to: Vector2, interpolation: Interpolation): Vector2;
}
declare class NumberAnimator<T extends RenderObject> extends GenericAnimator<T, number> {
    interpolate(amount: number, from: number, to: number, interpolation: Interpolation): number;
}
declare class VectorGraphics {
    private readonly canvas;
    constructor(canvas: CanvasRenderingContext2D);
    fillStyle(color: Color): VectorGraphics;
    strokeStyle(lineWidth: number, color?: Color): VectorGraphics;
    drawRect(x: number, y: number, width: number, height: number): VectorGraphics;
    drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): VectorGraphics;
}
declare class Renderer {
    view: HTMLCanvasElement;
    backgroundColor: Color;
    vectorGraphics: VectorGraphics;
    private readonly context;
    constructor(width: number, height: number);
    width: number;
    height: number;
    size: Vector2;
    imageSmoothing: boolean;
    render(renderObject: RenderObject): void;
    renderTexture(texture?: Texture, x?: number, y?: number, width?: number, height?: number, sx?: number, sy?: number, sWidth?: number, sHeight?: number): void;
    renderText(text: string, x?: number, y?: number): void;
    measureText(text: string): number;
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
    private handleAnimationFrame(time);
    render(): void;
    update(delta: number): void;
}
declare class Color {
    private readonly hex;
    constructor(color: number | string);
    readonly r: number;
    readonly g: number;
    readonly b: number;
    toHex(): string;
    toCssHex(): string;
    toInt(): number;
    static fromComponents(r: number, g: number, b: number): Color;
    static black: Color;
    static silver: Color;
    static gray: Color;
    static white: Color;
    static maroon: Color;
    static red: Color;
    static purple: Color;
    static fuchsia: Color;
    static green: Color;
    static lime: Color;
    static olive: Color;
    static yellow: Color;
    static navy: Color;
    static blue: Color;
    static teal: Color;
    static aqua: Color;
    static orange: Color;
    static aliceblue: Color;
    static antiquewhite: Color;
    static aquamarine: Color;
    static azure: Color;
    static beige: Color;
    static bisque: Color;
    static blanchedalmond: Color;
    static blueviolet: Color;
    static brown: Color;
    static burlywood: Color;
    static cadetblue: Color;
    static chartreuse: Color;
    static chocolate: Color;
    static coral: Color;
    static cornflowerblue: Color;
    static cornsilk: Color;
    static crimson: Color;
    static darkblue: Color;
    static darkcyan: Color;
    static darkgoldenrod: Color;
    static darkgray: Color;
    static darkgreen: Color;
    static darkgrey: Color;
    static darkkhaki: Color;
    static darkmagenta: Color;
    static darkolivegreen: Color;
    static darkorange: Color;
    static darkorchid: Color;
    static darkred: Color;
    static darksalmon: Color;
    static darkseagreen: Color;
    static darkslateblue: Color;
    static darkslategray: Color;
    static darkslategrey: Color;
    static darkturquoise: Color;
    static darkviolet: Color;
    static deeppink: Color;
    static deepskyblue: Color;
    static dimgray: Color;
    static dimgrey: Color;
    static dodgerblue: Color;
    static firebrick: Color;
    static floralwhite: Color;
    static forestgreen: Color;
    static gainsboro: Color;
    static ghostwhite: Color;
    static gold: Color;
    static goldenrod: Color;
    static greenyellow: Color;
    static grey: Color;
    static honeydew: Color;
    static hotpink: Color;
    static indianred: Color;
    static indigo: Color;
    static ivory: Color;
    static khaki: Color;
    static lavender: Color;
    static lavenderblush: Color;
    static lawngreen: Color;
    static lemonchiffon: Color;
    static lightblue: Color;
    static lightcoral: Color;
    static lightcyan: Color;
    static lightgoldenrodyellow: Color;
    static lightgray: Color;
    static lightgreen: Color;
    static lightgrey: Color;
    static lightpink: Color;
    static lightsalmon: Color;
    static lightseagreen: Color;
    static lightskyblue: Color;
    static lightslategray: Color;
    static lightslategrey: Color;
    static lightsteelblue: Color;
    static lightyellow: Color;
    static limegreen: Color;
    static linen: Color;
    static mediumaquamarine: Color;
    static mediumblue: Color;
    static mediumorchid: Color;
    static mediumpurple: Color;
    static mediumseagreen: Color;
    static mediumslateblue: Color;
    static mediumspringgreen: Color;
    static mediumturquoise: Color;
    static mediumvioletred: Color;
    static midnightblue: Color;
    static mintcream: Color;
    static mistyrose: Color;
    static moccasin: Color;
    static navajowhite: Color;
    static oldlace: Color;
    static olivedrab: Color;
    static orangered: Color;
    static orchid: Color;
    static palegoldenrod: Color;
    static palegreen: Color;
    static paleturquoise: Color;
    static palevioletred: Color;
    static papayawhip: Color;
    static peachpuff: Color;
    static peru: Color;
    static pink: Color;
    static plum: Color;
    static powderblue: Color;
    static rosybrown: Color;
    static royalblue: Color;
    static saddlebrown: Color;
    static salmon: Color;
    static sandybrown: Color;
    static seagreen: Color;
    static seashell: Color;
    static sienna: Color;
    static skyblue: Color;
    static slateblue: Color;
    static slategray: Color;
    static slategrey: Color;
    static snow: Color;
    static springgreen: Color;
    static steelblue: Color;
    static tan: Color;
    static thistle: Color;
    static tomato: Color;
    static turquoise: Color;
    static violet: Color;
    static wheat: Color;
    static whitesmoke: Color;
    static yellowgreen: Color;
    static rebeccapurple: Color;
}
declare class EventObserver<T extends Function> {
    fn: T;
    context: any;
    once: boolean;
    needRemoval: boolean;
    constructor(fn: T, context: any, once: boolean);
    execute(dispatcher: (fn: T) => void): void;
}
interface IObservableEvent<T extends Function> {
    subscribe(fn: T, context?: any): void;
    subscribeOnce(fn: T, context?: any): void;
    remove(fn: T): void;
    removeAll(): void;
}
declare class ObservableEvent<T extends Function> implements IObservableEvent<T> {
    private observers;
    dispatch(dispatcher: (fn: T) => void): void;
    subscribe(fn: T, context?: any): void;
    subscribeOnce(fn: T, context?: any): void;
    private addObserver(fn, context, once);
    remove(fn: T): void;
    removeAll(): void;
}
declare class NotImplementedError implements Error {
    name: string;
    message: string;
    constructor(message?: string);
}
declare class RenderObject {
    children: RenderObject[];
    parent?: RenderObject;
    animations: AnimationCollection;
    tasks: TaskList;
    private currentAnimation;
    addChild(container: RenderObject): void;
    removeChild(container: RenderObject): boolean;
    render(renderer: Renderer): void;
    beforeRender(renderer: Renderer): void;
    afterRender(renderer: Renderer): void;
    update(delta: number): void;
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
declare enum TextAlignment {
    Start = 0,
    Center = 1,
    End = 2,
}
declare class Label extends Widget {
    text?: string;
    verticalTextAlignment: TextAlignment;
    horizontalTextAlignment: TextAlignment;
    constructor(text?: string);
    render(renderer: Renderer): void;
}
interface Array<T> {
    last(filter?: (element: T, index: number) => boolean): T;
    lastOrDefault(filter?: (element: T, index: number) => boolean): T;
    first(filter?: (element: T, index: number) => boolean): T;
    firstOrDefault(filter?: (element: T, index: number) => boolean): T;
    any(): boolean;
}
interface Math {
    lerp(amount: number, from: number, to: number): number;
    clamp(value: number, min: number, max: number): number;
    HALFPI: number;
}
declare class Mechanism {
    static version: string;
    static helloWorld(): void;
}
declare class Texture {
    source?: HTMLImageElement;
    constructor(source?: HTMLImageElement);
    static fromImage(url: string): Texture;
    readonly size: Vector2;
    readonly width: number;
    readonly height: number;
}
declare class Sprite extends Widget {
    texture?: Texture;
    constructor(texture?: Texture);
    static fromImage(url: string): Sprite;
    render(renderer: Renderer): void;
    static textureAnimator: () => GenericAnimator<Sprite, Texture>;
}
declare class Rectangle {
    min: Vector2;
    max: Vector2;
    constructor(min: Vector2, max: Vector2);
    constructor(left: number, top: number, right: number, bottom: number);
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly width: number;
    readonly height: number;
}
declare class NineGrid extends Widget {
    texture?: Texture;
    left: number;
    right: number;
    top: number;
    bottom: number;
    constructor(texture?: Texture);
    render(renderer: Renderer): void;
    private getParts();
}
declare abstract class WaitPredicate {
    totalTime: number;
    abstract evaluate(): boolean;
}
declare class AnimationWaitPredicate extends WaitPredicate {
    renderObject: RenderObject;
    evaluate(): boolean;
}
declare class BooleanWaitPredicate extends WaitPredicate {
    predicate: (totalTime: number) => boolean;
    evaluate(): boolean;
}
declare class TimeWaitPredicate extends WaitPredicate {
    waitTime: number;
    evaluate(): boolean;
}
declare class TaskWaitPredicate extends WaitPredicate {
    task: Task;
    evaluate(): boolean;
}
declare class Task {
    static current?: Task;
    private iterator?;
    private waitPredicate?;
    totalTime: number;
    delta: number;
    constructor(iterator: Iterator<WaitPredicate>);
    readonly completed: boolean;
    update(delta: number): void;
    private processWaitPredicate(delta);
    stop(): void;
    static sinMotion(timePeriod: number, from: number, to: number): IterableIterator<number>;
    static sqrtMotion(timePeriod: number, from: number, to: number): IterableIterator<number>;
    static linearMotion(timePeriod: number, from: number, to: number): IterableIterator<number>;
    static motion(timePeriod: number, from: number, to: number, fn: (fraction: number) => number): IterableIterator<number>;
}
declare class TaskList {
    static current?: TaskList;
    private tasks;
    add(task: Task | Iterator<WaitPredicate>): void;
    update(delta: number): void;
}
declare class Wait {
    static seconds(seconds: number): TimeWaitPredicate;
    static frame(): TimeWaitPredicate;
    static task(task: Iterator<WaitPredicate>): TaskWaitPredicate;
    static while(predicate: (totalTime: number) => boolean): BooleanWaitPredicate;
    static animation(renderObject: RenderObject): AnimationWaitPredicate;
}
