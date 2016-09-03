/// <reference path="MainMenu.ts" />
/// <reference path="SceneManager.ts"/>
class Game extends Application {
    sceneManager = new SceneManager();

    constructor() {
        super();
        this.renderer.backgroundColor = new Color(0x1099bb);
        this.sceneManager.open(MainMenu);
    }

    render(time: number): void {
        this.root = this.sceneManager.currentScene.root;
        super.render(time);
    }
}

var game: Game;
window.onload = () => {
    game = new Game();
    document.body.appendChild(game.view);
    game.run();
};