var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FinalAnimationAction = (function () {
    function FinalAnimationAction(frame, animation) {
        if (frame === void 0) { frame = 0; }
        if (animation === void 0) { animation = undefined; }
        this.animation = animation;
        this.frame = frame;
    }
    return FinalAnimationAction;
}());
var Animation = (function () {
    function Animation(frameCount) {
        this.animators = {};
        this.currentFrame = 0;
        this.frameCount = frameCount;
    }
    Animation.prototype.run = function (frame) {
        if (frame === void 0) { frame = 0; }
        this.currentFrame = frame;
    };
    Animation.prototype.setAnimator = function (animator) {
        this.animators[animator.getName()] = animator;
    };
    Animation.prototype.advance = function (frameCount, object) {
        var nextFrame = this.currentFrame + frameCount;
        var animators = this.animators;
        for (var animatorName in animators) {
            if (animators.hasOwnProperty(animatorName)) {
                animators[animatorName].apply(object, nextFrame);
            }
        }
        this.currentFrame = nextFrame;
        if (this.frameCount === nextFrame)
            return this.finalAction;
        return undefined;
    };
    Animation.loop = function (frame) {
        if (frame === void 0) { frame = 0; }
        return new FinalAnimationAction(frame);
    };
    Animation.goto = function (frame, animation) {
        if (frame === void 0) { frame = 0; }
        return new FinalAnimationAction(frame, animation);
    };
    return Animation;
}());
var AnimationCollection = (function () {
    function AnimationCollection() {
        this.animations = {};
    }
    AnimationCollection.prototype.set = function (name, animation) {
        if (this.animations.hasOwnProperty(name))
            throw "Animation with this name has been added already";
        this.animations[name] = animation;
    };
    AnimationCollection.prototype.get = function (name) {
        if (!this.animations.hasOwnProperty(name))
            throw "Animation with this name hasn't been added";
        return this.animations[name];
    };
    return AnimationCollection;
}());
var Interpolation;
(function (Interpolation) {
    Interpolation[Interpolation["None"] = 0] = "None";
    Interpolation[Interpolation["Linear"] = 1] = "Linear";
})(Interpolation || (Interpolation = {}));
var Animator = (function () {
    function Animator() {
        this.frames = [];
    }
    Animator.prototype.apply = function (object, frame) {
        var lastFrame = this.frames.lastOrDefault(function (element, index) { return index <= frame; });
        if (!lastFrame)
            return;
        if (lastFrame.interpolation === Interpolation.None) {
            this.applyValue(object, lastFrame.value);
            return;
        }
        var nextFrame = this.frames.firstOrDefault(function (element, index) { return index > frame; });
        if (!nextFrame) {
            this.applyValue(object, lastFrame.value);
            return;
        }
        var lastIndex = this.frames.indexOf(lastFrame);
        var nextIndex = this.frames.indexOf(nextFrame);
        var amount = (frame - lastIndex) / (nextIndex - lastIndex);
        var interpolatedValue = this.interpolate(amount, lastFrame.value, nextFrame.value, lastFrame.interpolation);
        this.applyValue(object, interpolatedValue);
    };
    return Animator;
}());
var KeyFrame = (function () {
    function KeyFrame(value, interpolation) {
        if (interpolation === void 0) { interpolation = Interpolation.None; }
        this.value = value;
        this.interpolation = interpolation;
    }
    return KeyFrame;
}());
var GenericAnimator = (function (_super) {
    __extends(GenericAnimator, _super);
    function GenericAnimator(name) {
        _super.call(this);
        this.frames = [];
        this.name = name;
    }
    GenericAnimator.prototype.setFrame = function (frame, value, interpolation) {
        if (interpolation === void 0) { interpolation = Interpolation.None; }
        this.frames[frame] = new KeyFrame(value, interpolation);
    };
    GenericAnimator.prototype.applyValue = function (object, value) {
        object[this.name] = value;
    };
    GenericAnimator.prototype.getName = function () {
        return this.name;
    };
    GenericAnimator.prototype.interpolate = function (amount, from, to, interpolation) {
        return from;
    };
    return GenericAnimator;
}(Animator));
var Vector2Mutator = (function () {
    function Vector2Mutator(vector) {
        this.origin = vector;
    }
    Vector2Mutator.prototype.add = function (value) {
        this.apply(value, function (lhs, rhs) { return lhs + rhs; });
        return this;
    };
    Vector2Mutator.prototype.subtract = function (value) {
        this.apply(value, function (lhs, rhs) { return lhs - rhs; });
        return this;
    };
    Vector2Mutator.prototype.multiply = function (value) {
        this.apply(value, function (lhs, rhs) { return lhs * rhs; });
        return this;
    };
    Vector2Mutator.prototype.divide = function (value) {
        this.apply(value, function (lhs, rhs) { return lhs / rhs; });
        return this;
    };
    Vector2Mutator.prototype.apply = function (value, func) {
        if (value instanceof Vector2) {
            this.origin.x = func(this.origin.x, value.x);
            this.origin.y = func(this.origin.y, value.y);
        }
        else {
            this.origin.x = func(this.origin.x, value);
            this.origin.y = func(this.origin.y, value);
        }
    };
    return Vector2Mutator;
}());
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (value) {
        return this.combine(value, function (lhs, rhs) { return lhs + rhs; });
    };
    Vector2.prototype.subtract = function (value) {
        return this.combine(value, function (lhs, rhs) { return lhs - rhs; });
    };
    Vector2.prototype.multiply = function (value) {
        return this.combine(value, function (lhs, rhs) { return lhs * rhs; });
    };
    Vector2.prototype.divide = function (value) {
        return this.combine(value, function (lhs, rhs) { return lhs / rhs; });
    };
    Vector2.prototype.combine = function (value, func) {
        if (value instanceof Vector2)
            return new Vector2(func(this.x, value.x), func(this.y, value.y));
        else
            return new Vector2(func(this.x, value), func(this.y, value));
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.mutate = function () {
        return new Vector2Mutator(this);
    };
    Object.defineProperty(Vector2, "zero", {
        get: function () {
            return new Vector2(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "half", {
        get: function () {
            return new Vector2(0.5, 0.5);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2, "one", {
        get: function () {
            return new Vector2(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    return Vector2;
}());
var Vector2Animator = (function (_super) {
    __extends(Vector2Animator, _super);
    function Vector2Animator() {
        _super.apply(this, arguments);
    }
    Vector2Animator.prototype.interpolate = function (amount, from, to, interpolation) {
        switch (interpolation) {
            case Interpolation.Linear:
                return new Vector2(Math.lerp(amount, from.x, to.x), Math.lerp(amount, from.y, to.y));
            default:
                throw "Not supported";
        }
    };
    return Vector2Animator;
}(GenericAnimator));
var NumberAnimator = (function (_super) {
    __extends(NumberAnimator, _super);
    function NumberAnimator() {
        _super.apply(this, arguments);
    }
    NumberAnimator.prototype.interpolate = function (amount, from, to, interpolation) {
        switch (interpolation) {
            case Interpolation.Linear:
                return Math.lerp(amount, from, to);
            default:
                throw "Not supported";
        }
    };
    return NumberAnimator;
}(GenericAnimator));
var VectorGraphics = (function () {
    function VectorGraphics(canvas) {
        this.canvas = canvas;
    }
    VectorGraphics.prototype.drawRect = function (color, x, y, width, height) {
        this.canvas.save();
        this.canvas.fillStyle = color.toCssHex();
        this.canvas.fillRect(x, y, width, height);
        this.canvas.restore();
        return this;
    };
    return VectorGraphics;
}());
var Renderer = (function () {
    function Renderer(width, height) {
        var canvas = document.createElement("canvas");
        this.view = canvas;
        this.context = canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.vectorGraphics = new VectorGraphics(this.context);
    }
    Object.defineProperty(Renderer.prototype, "width", {
        get: function () {
            return this.view.clientWidth;
        },
        set: function (value) {
            this.view.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "height", {
        get: function () {
            return this.view.clientHeight;
        },
        set: function (value) {
            this.view.height = value;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.render = function (renderObject) {
        renderObject.beforeRender(this);
        renderObject.render(this);
        renderObject.afterRender(this);
    };
    Renderer.prototype.renderTexture = function (texture, x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (texture && texture.source)
            this.context.drawImage(texture.source, x, y, width, height);
        else
            this.renderUndefinedTexture(x, y, width, height);
    };
    Renderer.prototype.renderUndefinedTexture = function (x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var image = new Image();
        image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAG0lEQVQI12O4yTDl////WEkGXBL///9nGAb6AKuosf7WkzVAAAAAAElFTkSuQmCC";
        var ctx = this.context;
        var smoothings = [ctx.mozImageSmoothingEnabled, ctx.webkitImageSmoothingEnabled,
            ctx.msImageSmoothingEnabled, ctx.imageSmoothingEnabled];
        ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled =
            ctx.msImageSmoothingEnabled = ctx.imageSmoothingEnabled = false;
        ctx.drawImage(image, x, y, width, height);
        ctx.mozImageSmoothingEnabled = smoothings[0], ctx.webkitImageSmoothingEnabled = smoothings[1], ctx.msImageSmoothingEnabled = smoothings[2], ctx.imageSmoothingEnabled = smoothings[3];
    };
    Renderer.prototype.translate = function (x, y) {
        this.context.translate(x, y);
    };
    Renderer.prototype.rotate = function (angle) {
        var radians = (Math.PI / 180) * angle;
        this.context.rotate(radians);
    };
    Renderer.prototype.scale = function (x, y) {
        this.context.scale(x, y);
    };
    Renderer.prototype.save = function () {
        this.context.save();
    };
    Renderer.prototype.restore = function () {
        this.context.restore();
    };
    Renderer.prototype.clip = function (x, y, width, height) {
        var path = new Path2D();
        path.rect(x, y, width, height);
        this.context.clip(path);
    };
    Renderer.prototype.flush = function () {
        this.context.save();
        if (this.backgroundColor) {
            this.context.fillStyle = this.backgroundColor.toCssHex();
            this.context.fillRect(0, 0, this.width, this.height);
        }
        else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        this.context.restore();
    };
    return Renderer;
}());
var AudioPlayer = (function () {
    function AudioPlayer() {
        this.audioElements = [];
        this.freeAudioElements = [];
        this.view = document.createElement("div");
    }
    AudioPlayer.prototype.play = function (source, loop) {
        if (loop === void 0) { loop = false; }
        var audioElement;
        if (this.freeAudioElements.length === 0)
            this.freeAudioElements = this.getFreeAudioElements();
        if (this.freeAudioElements.length === 0) {
            audioElement = document.createElement("audio");
            this.view.appendChild(audioElement);
        }
        else {
            audioElement = this.freeAudioElements.pop();
        }
        audioElement.src = source;
        audioElement.loop = loop;
        audioElement.play();
    };
    AudioPlayer.prototype.getFreeAudioElements = function () {
        return this.audioElements.filter(function (value) { return value.paused; });
    };
    return AudioPlayer;
}());
var Application = (function () {
    function Application(width, height) {
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        this.fps = 0;
        this.view = document.createElement("div");
        this.renderer = new Renderer(width, height);
        this.view.appendChild(this.renderer.view);
        this.audio = new AudioPlayer();
        this.view.appendChild(this.audio.view);
    }
    Application.prototype.run = function () {
        var _this = this;
        window.requestAnimationFrame(function (time) { return _this.render(time); });
    };
    Application.prototype.render = function (time) {
        var _this = this;
        if (!this.time)
            this.time = time;
        var delta = time - this.time;
        this.fps = (1 / delta) * 1000;
        this.renderer.flush();
        if (this.root) {
            this.root.update();
            this.renderer.render(this.root);
        }
        this.time = time;
        window.requestAnimationFrame(function (time) { return _this.render(time); });
    };
    return Application;
}());
var Color = (function () {
    function Color(color) {
        if (typeof color === "number") {
            this.hex = color.toString(16);
        }
        else {
            this.hex = color;
        }
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return parseInt(this.hex.substring(0, 2), 16);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return parseInt(this.hex.substring(2, 4), 16);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return parseInt(this.hex.substring(4, 6), 16);
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.toHex = function () {
        return this.hex;
    };
    Color.prototype.toCssHex = function () {
        var hex = "000000".substr(0, 6 - this.hex.length) + this.hex;
        return "#" + hex;
    };
    Color.prototype.toInt = function () {
        return parseInt(this.hex, 16);
    };
    Color.fromComponents = function (r, g, b) {
        return new Color((r << 16) + (g << 8) + b);
    };
    Color.black = new Color(0x000000);
    Color.silver = new Color(0xc0c0c0);
    Color.gray = new Color(0x808080);
    Color.white = new Color(0xffffff);
    Color.maroon = new Color(0x800000);
    Color.red = new Color(0xff0000);
    Color.purple = new Color(0x800080);
    Color.fuchsia = new Color(0xff00ff);
    Color.green = new Color(0x008000);
    Color.lime = new Color(0x00ff00);
    Color.olive = new Color(0x808000);
    Color.yellow = new Color(0xffff00);
    Color.navy = new Color(0x000080);
    Color.blue = new Color(0x0000ff);
    Color.teal = new Color(0x008080);
    Color.aqua = new Color(0x00ffff);
    Color.orange = new Color(0xffa500);
    Color.aliceblue = new Color(0xf0f8ff);
    Color.antiquewhite = new Color(0xfaebd7);
    Color.aquamarine = new Color(0x7fffd4);
    Color.azure = new Color(0xf0ffff);
    Color.beige = new Color(0xf5f5dc);
    Color.bisque = new Color(0xffe4c4);
    Color.blanchedalmond = new Color(0xffebcd);
    Color.blueviolet = new Color(0x8a2be2);
    Color.brown = new Color(0xa52a2a);
    Color.burlywood = new Color(0xdeb887);
    Color.cadetblue = new Color(0x5f9ea0);
    Color.chartreuse = new Color(0x7fff00);
    Color.chocolate = new Color(0xd2691e);
    Color.coral = new Color(0xff7f50);
    Color.cornflowerblue = new Color(0x6495ed);
    Color.cornsilk = new Color(0xfff8dc);
    Color.crimson = new Color(0xdc143c);
    Color.darkblue = new Color(0x00008b);
    Color.darkcyan = new Color(0x008b8b);
    Color.darkgoldenrod = new Color(0xb8860b);
    Color.darkgray = new Color(0xa9a9a9);
    Color.darkgreen = new Color(0x006400);
    Color.darkgrey = new Color(0xa9a9a9);
    Color.darkkhaki = new Color(0xbdb76b);
    Color.darkmagenta = new Color(0x8b008b);
    Color.darkolivegreen = new Color(0x556b2f);
    Color.darkorange = new Color(0xff8c00);
    Color.darkorchid = new Color(0x9932cc);
    Color.darkred = new Color(0x8b0000);
    Color.darksalmon = new Color(0xe9967a);
    Color.darkseagreen = new Color(0x8fbc8f);
    Color.darkslateblue = new Color(0x483d8b);
    Color.darkslategray = new Color(0x2f4f4f);
    Color.darkslategrey = new Color(0x2f4f4f);
    Color.darkturquoise = new Color(0x00ced1);
    Color.darkviolet = new Color(0x9400d3);
    Color.deeppink = new Color(0xff1493);
    Color.deepskyblue = new Color(0x00bfff);
    Color.dimgray = new Color(0x696969);
    Color.dimgrey = new Color(0x696969);
    Color.dodgerblue = new Color(0x1e90ff);
    Color.firebrick = new Color(0xb22222);
    Color.floralwhite = new Color(0xfffaf0);
    Color.forestgreen = new Color(0x228b22);
    Color.gainsboro = new Color(0xdcdcdc);
    Color.ghostwhite = new Color(0xf8f8ff);
    Color.gold = new Color(0xffd700);
    Color.goldenrod = new Color(0xdaa520);
    Color.greenyellow = new Color(0xadff2f);
    Color.grey = new Color(0x808080);
    Color.honeydew = new Color(0xf0fff0);
    Color.hotpink = new Color(0xff69b4);
    Color.indianred = new Color(0xcd5c5c);
    Color.indigo = new Color(0x4b0082);
    Color.ivory = new Color(0xfffff0);
    Color.khaki = new Color(0xf0e68c);
    Color.lavender = new Color(0xe6e6fa);
    Color.lavenderblush = new Color(0xfff0f5);
    Color.lawngreen = new Color(0x7cfc00);
    Color.lemonchiffon = new Color(0xfffacd);
    Color.lightblue = new Color(0xadd8e6);
    Color.lightcoral = new Color(0xf08080);
    Color.lightcyan = new Color(0xe0ffff);
    Color.lightgoldenrodyellow = new Color(0xfafad2);
    Color.lightgray = new Color(0xd3d3d3);
    Color.lightgreen = new Color(0x90ee90);
    Color.lightgrey = new Color(0xd3d3d3);
    Color.lightpink = new Color(0xffb6c1);
    Color.lightsalmon = new Color(0xffa07a);
    Color.lightseagreen = new Color(0x20b2aa);
    Color.lightskyblue = new Color(0x87cefa);
    Color.lightslategray = new Color(0x778899);
    Color.lightslategrey = new Color(0x778899);
    Color.lightsteelblue = new Color(0xb0c4de);
    Color.lightyellow = new Color(0xffffe0);
    Color.limegreen = new Color(0x32cd32);
    Color.linen = new Color(0xfaf0e6);
    Color.mediumaquamarine = new Color(0x66cdaa);
    Color.mediumblue = new Color(0x0000cd);
    Color.mediumorchid = new Color(0xba55d3);
    Color.mediumpurple = new Color(0x9370db);
    Color.mediumseagreen = new Color(0x3cb371);
    Color.mediumslateblue = new Color(0x7b68ee);
    Color.mediumspringgreen = new Color(0x00fa9a);
    Color.mediumturquoise = new Color(0x48d1cc);
    Color.mediumvioletred = new Color(0xc71585);
    Color.midnightblue = new Color(0x191970);
    Color.mintcream = new Color(0xf5fffa);
    Color.mistyrose = new Color(0xffe4e1);
    Color.moccasin = new Color(0xffe4b5);
    Color.navajowhite = new Color(0xffdead);
    Color.oldlace = new Color(0xfdf5e6);
    Color.olivedrab = new Color(0x6b8e23);
    Color.orangered = new Color(0xff4500);
    Color.orchid = new Color(0xda70d6);
    Color.palegoldenrod = new Color(0xeee8aa);
    Color.palegreen = new Color(0x98fb98);
    Color.paleturquoise = new Color(0xafeeee);
    Color.palevioletred = new Color(0xdb7093);
    Color.papayawhip = new Color(0xffefd5);
    Color.peachpuff = new Color(0xffdab9);
    Color.peru = new Color(0xcd853f);
    Color.pink = new Color(0xffc0cb);
    Color.plum = new Color(0xdda0dd);
    Color.powderblue = new Color(0xb0e0e6);
    Color.rosybrown = new Color(0xbc8f8f);
    Color.royalblue = new Color(0x4169e1);
    Color.saddlebrown = new Color(0x8b4513);
    Color.salmon = new Color(0xfa8072);
    Color.sandybrown = new Color(0xf4a460);
    Color.seagreen = new Color(0x2e8b57);
    Color.seashell = new Color(0xfff5ee);
    Color.sienna = new Color(0xa0522d);
    Color.skyblue = new Color(0x87ceeb);
    Color.slateblue = new Color(0x6a5acd);
    Color.slategray = new Color(0x708090);
    Color.slategrey = new Color(0x708090);
    Color.snow = new Color(0xfffafa);
    Color.springgreen = new Color(0x00ff7f);
    Color.steelblue = new Color(0x4682b4);
    Color.tan = new Color(0xd2b48c);
    Color.thistle = new Color(0xd8bfd8);
    Color.tomato = new Color(0xff6347);
    Color.turquoise = new Color(0x40e0d0);
    Color.violet = new Color(0xee82ee);
    Color.wheat = new Color(0xf5deb3);
    Color.whitesmoke = new Color(0xf5f5f5);
    Color.yellowgreen = new Color(0x9acd32);
    Color.rebeccapurple = new Color(0xffa500);
    return Color;
}());
if (!Array.prototype.last) {
    Array.prototype.last = function (filter) {
        if (this.length === 0)
            throw "Array contains no elements";
        var last;
        if (filter) {
            var filtered = this.filter(filter);
            if (filtered.length === 0)
                throw "Array contains no matching element";
            last = filtered[filtered.length - 1];
        }
        else
            last = this[this.length - 1];
        return last;
    };
}
;
if (!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function (filter) {
        try {
            return this.last(filter);
        }
        catch (e) {
            return undefined;
        }
    };
}
;
if (!Array.prototype.first) {
    Array.prototype.first = function (filter) {
        if (this.length === 0)
            throw "Array contains no elements";
        if (filter) {
            var filtered = this.filter(filter);
            if (filtered.length === 0)
                throw "Array contains no matching element";
            return filtered[0];
        }
        return this[0];
    };
}
;
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (filter) {
        try {
            return this.first(filter);
        }
        catch (e) {
            return undefined;
        }
    };
}
;
Math.lerp = function (amount, from, to) { return from + (to - from) * amount; };
var Mechanism = (function () {
    function Mechanism() {
    }
    Mechanism.helloWorld = function () {
        console.debug("Mechanism " + this.version);
    };
    Mechanism.version = "1.0.0";
    return Mechanism;
}());
var NotImplementedError = (function () {
    function NotImplementedError(message) {
        if (message === void 0) { message = "Not implemented"; }
        this.name = "NotImplementedError";
        this.message = message;
    }
    return NotImplementedError;
}());
var RenderObject = (function () {
    function RenderObject() {
        this.children = [];
        this.animations = new AnimationCollection();
    }
    RenderObject.prototype.addChild = function (container) {
        this.children.push(container);
        container.parent = this;
    };
    RenderObject.prototype.removeChild = function (container) {
        var index = this.children.indexOf(container);
        if (index === -1)
            return false;
        this.children.splice(index, 1);
        container.parent = null;
        return true;
    };
    RenderObject.prototype.render = function (renderer) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            renderer.render(child);
        }
    };
    RenderObject.prototype.beforeRender = function (renderer) { };
    RenderObject.prototype.afterRender = function (renderer) { };
    RenderObject.prototype.update = function () {
        if (this.currentAnimation) {
            var goto = this.currentAnimation.advance(1, this);
            if (goto) {
                if (goto.animation)
                    this.runAnimation(goto.animation, goto.frame);
                this.currentAnimation.run(goto.frame);
            }
        }
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.update();
        }
    };
    RenderObject.prototype.runAnimation = function (name, frame) {
        if (frame === void 0) { frame = 0; }
        this.currentAnimation = this.animations.get(name);
        this.currentAnimation.run(frame);
    };
    RenderObject.prototype.runChildAnimation = function (name) {
        throw new NotImplementedError();
    };
    return RenderObject;
}());
var Widget = (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        _super.apply(this, arguments);
        this.children = [];
        this.position = Vector2.zero;
        this.scale = Vector2.one;
        this.rotation = 0;
        this.pivot = Vector2.zero;
        this.size = new Vector2(100, 100);
    }
    Widget.prototype.beforeRender = function (renderer) {
        renderer.save();
        var offset = this.position.subtract(this.pivot.multiply(new Vector2(this.width, this.height)));
        renderer.translate(offset.x, offset.y);
        renderer.rotate(this.rotation);
        renderer.scale(this.scale.x, this.scale.y);
    };
    Widget.prototype.afterRender = function (renderer) {
        renderer.restore();
    };
    Object.defineProperty(Widget.prototype, "x", {
        get: function () {
            return this.position.x;
        },
        set: function (value) {
            this.position.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "y", {
        get: function () {
            return this.position.y;
        },
        set: function (value) {
            this.position.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "width", {
        get: function () {
            return this.size.x;
        },
        set: function (value) {
            this.size.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "height", {
        get: function () {
            return this.size.y;
        },
        set: function (value) {
            this.size.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Widget.prototype.addChild = function (widget) {
        _super.prototype.addChild.call(this, widget);
    };
    Widget.positionAnimator = function () { return new Vector2Animator("position"); };
    Widget.scaleAnimator = function () { return new Vector2Animator("scale"); };
    Widget.pivotAnimator = function () { return new Vector2Animator("pivot"); };
    Widget.sizeAnimator = function () { return new Vector2Animator("size"); };
    Widget.rotationAnimator = function () { return new NumberAnimator("rotation"); };
    return Widget;
}(RenderObject));
var Texture = (function () {
    function Texture(source) {
        if (source === void 0) { source = undefined; }
        this.source = source;
    }
    Texture.fromImage = function (url) {
        var image = new Image();
        var texture = new Texture(image);
        image.src = url;
        image.onerror = function () { texture.source = undefined; };
        return texture;
    };
    Object.defineProperty(Texture.prototype, "width", {
        get: function () {
            return this.source.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "height", {
        get: function () {
            return this.source.height;
        },
        enumerable: true,
        configurable: true
    });
    return Texture;
}());
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(texture) {
        if (texture === void 0) { texture = undefined; }
        _super.call(this);
        this.texture = texture;
    }
    Sprite.fromImage = function (url) {
        return new Sprite(Texture.fromImage(url));
    };
    Sprite.prototype.render = function (renderer) {
        renderer.renderTexture(this.texture, 0, 0, this.size.x, this.size.y);
        _super.prototype.render.call(this, renderer);
    };
    Sprite.textureAnimator = function () { return new GenericAnimator("texture"); };
    return Sprite;
}(Widget));
//# sourceMappingURL=mechanism.js.map