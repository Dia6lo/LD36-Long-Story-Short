class BlackRect extends Widget {
    constructor() {
        super();
        this.size = game.renderer.size.clone();
    }

    render(renderer: Renderer): void {
        renderer.vectorGraphics.drawRect(0, 0, this.width, this.height);
        super.render(renderer);
    }
}