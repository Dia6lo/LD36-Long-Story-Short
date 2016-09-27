/// <reference path="Scene.ts"/>
class MainMenu extends Scene {
    clouds = new Widget();
    cloudTexture = Texture.fromImage("assets/Cloud.png");
    title: Sprite;
    subtitle: Sprite;
    appearing: boolean;
    introRunning: boolean;

    constructor() {
        super();
        const bg = Sprite.fromImage("assets/MainMenu.png");
        bg.size = new Vector2(800, 600);
        const root = new Widget();
        this.clouds.width = game.renderer.width;
        root.addChild(this.clouds);
        root.addChild(bg);
        const caveMan = new CaveMan();
        caveMan.sprite.position = new Vector2(25, 250);
        root.addChild(caveMan.sprite);
        const campfire = new Campfire();
        campfire.sprite.position = new Vector2(250, 350);
        root.addChild(campfire.sprite);
        const title = Sprite.fromImage("assets/Title.png");
        title.position.set(50, 50);
        title.size.set(700, 61);
        root.addChild(title);
        this.title = title;
        const subtitle = Sprite.fromImage("assets/PressSpace.png");
        subtitle.position.set(400, 200);
        subtitle.size.set(300, 42);
        subtitle.pivot = Vector2.half;
        root.addChild(subtitle);
        this.subtitle = subtitle;
        this.root = root;
        game.audio.play("assets/GF.mp3");
        this.addCloud(new Vector2(250, 250), 0, 10, true);
        this.addCloud(new Vector2(100, 100), 100, 5, false);
        const blackRect = new BlackRect();
        blackRect.tasks.add(this.fadeIn(blackRect));
        this.root.addChild(blackRect);
        this.root.runChildAnimation("Idle");
    }

    update(delta: number): void {
        if (Math.random() < 0.01)
            this.spawnCloud();
        if (!this.appearing && !this.introRunning && game.input.wasKeyPressed(Key.Space))
            this.root.tasks.add(this.introTask());
    }

    *introTask(): Iterator<WaitPredicate> {
        this.introRunning = true;
        for (let t of Task.linearMotion(1, 1, 0)) {
            this.title.opacity = t;
            this.subtitle.opacity = t;
            yield Wait.frame();
        }
        yield Wait.task(this.showMessageTask("Mine happy!", 300, 100));
        yield Wait.seconds(0.25);
        this.root.runChildAnimation("Notice");
        yield Wait.seconds(0.5);
        yield Wait.task(this.showMessageTask("Uh-oh", 100, 100));
        yield Wait.seconds(0.25);
        this.root.runChildAnimation("Sad");
        yield Wait.seconds(0.5);
        yield Wait.task(this.showMessageTask("Mine sad", 150, 100));
        yield Wait.seconds(0.25);
        this.open(MainMenu);
    }

    private spawnCloud() {
        const size = 100 + Math.random() * 150;
        const fromLeftToRight = Math.random() > 0.5;
        const time = 5 + Math.random() * 15;
        const height = Math.random() * 100 - 50;
        this.addCloud(new Vector2(size, size), height, time, fromLeftToRight);
    }

    private addCloud(size: Vector2, height: number, time: number, fromLeftToRight: boolean) {
        const cloud = new Sprite(this.cloudTexture);
        cloud.y = height;
        cloud.size = size;
        cloud.tasks.add(this.cloudMoveTask(cloud, time, fromLeftToRight));
        this.clouds.addChild(cloud);
    }

    private *cloudMoveTask(cloud: Sprite, time: number, fromLeftToRight: boolean) {
        const left = 0 - this.cloudTexture.width;
        const right = this.clouds.width;
        const start = fromLeftToRight ? left : right;
        const finish = fromLeftToRight ? right : left;
        for (let t of Task.linearMotion(time, start, finish)) {
            cloud.x = t;
            yield Wait.frame();
        }
        this.clouds.removeChild(cloud);
    }

    private *fadeIn(rect: BlackRect) {
        this.appearing = true;
        for (let t of Task.linearMotion(2.5, 1, 0)) {
            rect.opacity = t;
            yield Wait.frame();
        }
        this.appearing = false;
    }
}