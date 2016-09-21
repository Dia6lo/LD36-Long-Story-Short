/// <reference path="Scene.ts"/>
/// <reference path="CaveMan.ts"/>
class MainMenu extends Scene {
    constructor() {
        super();
        const bg = Sprite.fromImage("assets/MainMenu.png");
        bg.size = new Vector2(800, 600);
        this.root = bg;
        const caveMan = new CaveMan();
        caveMan.sprite.position = new Vector2(25, 250);
        this.root.addChild(caveMan.sprite);
        game.audio.play("assets/GF.mp3");
    }
}
