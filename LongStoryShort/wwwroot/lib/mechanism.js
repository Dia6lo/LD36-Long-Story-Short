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
    Renderer.prototype.render = function (sprite) {
        this.flush();
        this.context.drawImage(sprite.texture.source, sprite.position.x, sprite.position.y);
    };
    Renderer.prototype.flush = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Renderer;
}());
var Sprite = (function () {
    function Sprite(texture) {
        this.position = new Vector2();
        this.texture = texture;
    }
    Sprite.fromImage = function (url) {
        return new Sprite(Texture.fromImage(url));
    };
    return Sprite;
}());
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
