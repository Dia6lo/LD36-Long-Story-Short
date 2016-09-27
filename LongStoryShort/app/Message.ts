class Message extends Widget {
    private label: Label;

    constructor(text: string, width: number, height: number) {
        super();
        const label = new Label(text);
        label.horizontalTextAlignment = TextAlignment.Center;
        label.verticalTextAlignment = TextAlignment.Center;
        label.size.set(width, height);
        this.size.set(width, height);
        this.addChild(label);
        this.label = label;
    }

    get text() {
        return this.label.text!;
    }

    set text(value: string) {
        this.label.text = value;
    }

    render(renderer: Renderer): void {
        renderer.save();
        renderer.vectorGraphics
            .strokeStyle(2)
            .fillStyle(Color.limegreen)
            .drawRoundedRect(0, 0, this.size.x, this.size.y, 10);
        renderer.restore();
        super.render(renderer);
    }
}