/// <reference path="Scene.ts"/>
class SceneManager {
    currentScene: Scene;

    open<T extends Scene>(scene: { new (): T }) {
        this.currentScene = new scene();
    }
}