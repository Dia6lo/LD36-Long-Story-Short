class CaveMan {
    private texture1 = Texture.fromImage("assets/CaveManMenu0.png");
    private texture2 = Texture.fromImage("assets/CaveManMenu1.png");
    sprite: Sprite;

    constructor() {
        this.sprite = new Sprite(this.texture1);
        const animation = new Animation(40);
        animation.finalAction = Animation.loop();
        const textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.texture1);
        textureAnimator.setFrame(20, this.texture2);
        animation.setAnimator(textureAnimator);
        this.sprite.animations.set("Idle", animation);
        this.sprite.runAnimation("Idle");
    }
}