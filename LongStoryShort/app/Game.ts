class Game extends Application {
    sceneManager = new SceneManager();

    constructor() {
        super();
        this.renderer.backgroundColor = Color.skyblue;
    }

    update(delta: number): void {
        this.root = this.sceneManager.currentScene.root;
        this.sceneManager.currentScene.update(delta);
        super.update(delta);
    }
}

var game: Game;
window.onload = () => {
    game = new Game();
    document.body.appendChild(game.view);
    game.sceneManager.open(MainMenu);
    game.run();
};