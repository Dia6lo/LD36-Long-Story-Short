var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mechanism = (function () {
    function Mechanism() {
    }
    Mechanism.helloWorld = function () {
        console.debug("Mechanism " + this.version);
    };
    Mechanism.version = "1.0.0";
    return Mechanism;
}());
var Renderer = (function () {
    function Renderer(width, height) {
        this.width = width;
        this.height = height;
        var canvas = document.createElement("canvas");
        canvas.height = height;
        canvas.width = width;
        this.view = canvas;
        this.context = canvas.getContext("2d");
    }
    Renderer.prototype.render = function (renderObject) {
        this.flush();
        renderObject.render(this);
    };
    Renderer.prototype.renderTexture = function (texture, x, y) {
        this.context.drawImage(texture.source, x, y);
    };
    Renderer.prototype.translate = function (x, y) {
        this.context.translate(x, y);
    };
    Renderer.prototype.rotate = function (angle) {
        var radians = (Math.PI / 180) * angle;
        this.context.rotate(radians);
    };
    Renderer.prototype.flush = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Renderer;
}());
var RenderObject = (function () {
    function RenderObject() {
        this.children = [];
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
            child.render(renderer);
        }
    };
    return RenderObject;
}());
///<reference path="RenderObject.ts"/>
var Widget = (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        _super.apply(this, arguments);
        this.position = new Vector2();
        this.rotation = 0;
    }
    Widget.prototype.render = function (renderer) {
        renderer.translate(this.position.x, this.position.y);
        renderer.rotate(this.rotation);
        _super.prototype.render.call(this, renderer);
        renderer.rotate(-this.rotation);
        renderer.translate(-this.position.x, -this.position.y);
    };
    return Widget;
}(RenderObject));
var Texture = (function () {
    function Texture(source) {
        this.source = source;
    }
    Texture.fromImage = function (url) {
        var image = new Image();
        var texture = new Texture(image);
        image.src = url;
        return texture;
    };
    return Texture;
}());
///<reference path="Widget.ts"/>
///<reference path="Texture.ts"/>
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(texture) {
        _super.call(this);
        this.texture = texture;
    }
    Sprite.fromImage = function (url) {
        return new Sprite(Texture.fromImage(url));
    };
    Sprite.prototype.render = function (renderer) {
        renderer.renderTexture(this.texture, this.position.x, this.position.y);
        _super.prototype.render.call(this, renderer);
    };
    return Sprite;
}(Widget));
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (value) {
        return new Vector2(this.x + value.x, this.y + value.y);
    };
    Vector2.prototype.subtract = function (value) {
        return new Vector2(this.x - value.x, this.y - value.y);
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.mutate = function () {
        return new Vector2Mutator(this);
    };
    return Vector2;
}());
var Vector2Mutator = (function () {
    function Vector2Mutator(vector) {
        this.origin = vector;
    }
    Vector2Mutator.prototype.add = function (value) {
        this.origin.x += value.x;
        this.origin.y += value.y;
        return this;
    };
    Vector2Mutator.prototype.subtract = function (value) {
        this.origin.x -= value.x;
        this.origin.y -= value.y;
        return this;
    };
    return Vector2Mutator;
}());
