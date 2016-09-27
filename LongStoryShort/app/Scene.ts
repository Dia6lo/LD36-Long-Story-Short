class Scene {
    root: RenderObject;

    open<T extends Scene>(scene: { new (): T }) {
        game.sceneManager.open(scene);
    }

    protected *showMessageTask(text: string, width: number, height: number) {
        const message = new Message(text, width, height);
        message.pivot = Vector2.half;
        this.root.addChild(message);
        const target = game.renderer.size.divide(2);
        message.position.set(target.x, -height);
        for (let t of Task.sinMotion(0.25, -height, target.y)) {
            message.position.y = t;
            yield Wait.frame();
        }
        yield Wait.seconds(1);
        for (let t of Task.sinMotion(0.25, target.y, game.renderer.height + height)) {
            message.position.y = t;
            yield Wait.frame();
        }
    }

    update(delta: number){}
}