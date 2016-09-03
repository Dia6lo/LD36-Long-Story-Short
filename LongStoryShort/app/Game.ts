/// <reference path="MainMenu.ts" />
/// <reference path="SceneManager.ts"/>
class Game {
    private renderer: Renderer;
    sceneManager = new SceneManager();

    run(): void {
        this.renderer = new Renderer(800, 600);
        this.renderer.backgroundColor = new Color(0x1099bb);
        this.sceneManager.open(MainMenu);
        document.body.appendChild(this.renderer.view);
        window.requestAnimationFrame((time) => this.render(time));
    }

    render(time: number): void {
        this.renderer.render(this.sceneManager.currentScene.root);
        window.requestAnimationFrame((time) => this.render(time));
    }
}

var game = new Game();
window.onload = ()=> game.run();