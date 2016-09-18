/// <reference path="Scene.ts"/>
class MainMenu extends Scene {
    constructor() {
        super();
        this.root = Sprite.fromImage("assets/MainMenu.png");
        const animation = new Animation();
        const positionAnimator = Widget.positionAnimator.create();
        positionAnimator.setFrame(0, new Vector2(0, 0), Interpolation.Linear);
        positionAnimator.setFrame(60, new Vector2(100, 100), Interpolation.Linear);
        positionAnimator.setFrame(120, new Vector2(0, 0));
        animation.setAnimator(positionAnimator);
        const rotationAnimator = Widget.rotationAnimator.create();
        rotationAnimator.setFrame(0, 0, Interpolation.Linear);
        rotationAnimator.setFrame(60, -180, Interpolation.Linear);
        rotationAnimator.setFrame(120, 0);
        animation.setAnimator(rotationAnimator);
        const scaleAnimator = Widget.scaleAnimator.create();
        scaleAnimator.setFrame(0, new Vector2(1, 1), Interpolation.Linear);
        scaleAnimator.setFrame(60, new Vector2(0, 0), Interpolation.Linear);
        scaleAnimator.setFrame(120, new Vector2(1, 1));
        animation.setAnimator(scaleAnimator);
        this.root.animations.set("Idle", animation);
        this.root.runAnimation("Idle");
    }
}
