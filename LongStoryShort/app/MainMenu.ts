/// <reference path="Scene.ts"/>
/// <reference path="CaveMan.ts"/>
/// <reference path="Campfire.ts"/>
class MainMenu extends Scene {
    constructor() {
        super();
        const bg = Sprite.fromImage("assets/MainMenu.png");
        bg.size = new Vector2(800, 600);
        this.root = bg;
        const caveMan = new CaveMan();
        caveMan.sprite.position = new Vector2(25, 250);
        this.root.addChild(caveMan.sprite);
        const campfire = new Campfire();
        campfire.sprite.position = new Vector2(250, 350);
        this.root.addChild(campfire.sprite);
        game.audio.play("assets/GF.mp3");
    }
}
