﻿/// <reference path="MainMenu.ts" />
/// <reference path="SceneManager.ts"/>
class Game extends Application {
    sceneManager = new SceneManager();

    constructor() {
        super();
        this.renderer.backgroundColor = Color.skyblue;
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
    game.sceneManager.open(MainMenu);
    game.run();
};