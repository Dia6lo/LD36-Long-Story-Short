class CaveMan {
    private textures = [0, 1, 2, 3].map((i) => Texture.fromImage(`assets/CaveManMenu${i}.png`));
    sprite = new Sprite(this.textures[0]);

    constructor() {
        this.sprite.size = new Vector2(250, 250);

        const idleAnimation = new Animation(40);
        idleAnimation.finalAction = Animation.loop();
        let textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.textures[0]);
        textureAnimator.setFrame(20, this.textures[1]);
        idleAnimation.setAnimator(textureAnimator);
        this.sprite.animations.set("Idle", idleAnimation);

        const noticeAnimation = new Animation(1);
        textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.textures[2]);
        noticeAnimation.setAnimator(textureAnimator);
        this.sprite.animations.set("Notice", noticeAnimation);

        const sadAnimation = new Animation(1);
        textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.textures[3]);
        sadAnimation.setAnimator(textureAnimator);
        this.sprite.animations.set("Sad", sadAnimation);

        this.sprite.runAnimation("Idle");
    }

    runIdleAnimation() {
        this.sprite.runAnimation("Idle");
    }

    runNoticeAnimation() {
        this.sprite.runAnimation("Notice");
    }

    runSadAnimation() {
        this.sprite.runAnimation("Sad");
    }
}

class Campfire {
    private textures = [0, 1, 2, 3].map((i) => Texture.fromImage(`assets/CaveManMenu${i}.png`));
    sprite = new Sprite(this.textures[0]);

    constructor() {
        this.sprite.size = new Vector2(250, 250);

        const idleAnimation = new Animation(40);
        idleAnimation.finalAction = Animation.loop();
        let textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.textures[0]);
        textureAnimator.setFrame(20, this.textures[1]);
        idleAnimation.setAnimator(textureAnimator);
        this.sprite.animations.set("Idle", idleAnimation);

        const noticeAnimation = new Animation(1);
        textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.textures[2]);
        noticeAnimation.setAnimator(textureAnimator);
        this.sprite.animations.set("Notice", noticeAnimation);

        const sadAnimation = new Animation(1);
        textureAnimator = Sprite.textureAnimator();
        textureAnimator.setFrame(0, this.textures[3]);
        sadAnimation.setAnimator(textureAnimator);
        this.sprite.animations.set("Sad", sadAnimation);

        this.sprite.runAnimation("Idle");
    }

    runIdleAnimation() {
        this.sprite.runAnimation("Idle");
    }

    runNoticeAnimation() {
        this.sprite.runAnimation("Notice");
    }

    runSadAnimation() {
        this.sprite.runAnimation("Sad");
    }
}