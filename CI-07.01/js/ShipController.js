class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.game.add.sprite(
            x,
            y,
            "assets",
            spriteName
        );
        this.configs = configs;
        this.setupBullets();
    }

    update() {
        if (Nakama.keyboard.isDown(this.configs.up)) {
            if (this.sprite.position.y >= Nakama.playerSpeed)
                this.sprite.position.y -= Nakama.playerSpeed;
            else
                this.sprite.position.y = 0;
        }
        if (Nakama.keyboard.isDown(this.configs.down)) {
            if (this.sprite.position.y <= (950 - 78))
                this.sprite.position.y += Nakama.playerSpeed;
            else
                this.sprite.position.y = 960 - 78;
        }
        if (Nakama.keyboard.isDown(this.configs.left)) {
            this.sprite.animations.add()
            if (this.sprite.position.x >= Nakama.playerSpeed)
                this.sprite.position.x -= Nakama.playerSpeed;
            else
                this.sprite.position.x = 0;
        }
        if (Nakama.keyboard.isDown(this.configs.right)) {
            if (this.sprite.position.x <= (630 - 78))
                this.sprite.position.x += Nakama.playerSpeed;
            else
                this.sprite.position.x = 640 - 78;
        }
        if (Nakama.keyboard.isDown(this.configs.fire)) {
            this.fire();
        }
    }

    setupBullets() {
        this.sprite.bulletTime = 0;
        this.sprite.bullets = Nakama.game.add.group();
        this.sprite.bullets.enableBody = true;
        this.sprite.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.sprite.bullets.createMultiple(50, 'assets', "BulletType1.png");
        this.sprite.bullets.setAll('anchor.x', 0.5);
        this.sprite.bullets.setAll('anchor.y', 1);
        this.sprite.bullets.setAll('outOfBoundsKill', true);
        this.sprite.bullets.setAll('checkWorldBounds', true);
    }

    fire() {
        if (Nakama.game.time.now > this.sprite.bulletTime) {

            var bullet = this.sprite.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(this.sprite.position.x + 39, this.sprite.position.y);
                bullet.body.velocity.y = -700;
                this.sprite.bulletTime = Nakama.game.time.now + 100;
            }
        }
    }
}
