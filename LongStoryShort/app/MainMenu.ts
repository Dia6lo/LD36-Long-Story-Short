/// <reference path="Scene.ts"/>
/// <reference path="CaveMan.ts"/>
class MainMenu extends Scene {
    constructor() {
        super();
        this.root = Sprite.fromImage("assets/MainMenu.png");
        const caveMan = new CaveMan();
        caveMan.sprite.position = new Vector2(25, 250);
        this.root.addChild(caveMan.sprite);
        game.audio.play("assets/GF.mp3");
        game.audio.play("assets/GF.mp3");
        game.audio.play("assets/GF.mp3");
        game.audio.play("assets/GF.mp3");
    }
}
