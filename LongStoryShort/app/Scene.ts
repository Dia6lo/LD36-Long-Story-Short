class Scene {
    root: RenderObject;

    open<T extends Scene>(scene: { new (): T }) {
        game.sceneManager.open(scene);
    }
}