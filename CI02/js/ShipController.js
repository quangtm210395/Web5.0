class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.playerGroup.create(
            x,
            y,
            "assets",
            spriteName
        );
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;

        this.configs = configs;
        this.timeSinceLastFire = 0;
        // this.setupBullets();
    }

    update() {
        //
        if (Nakama.keyboard.isDown(this.configs.up)) {
            this.sprite.body.velocity.y = -Nakama.configs.shipSpeed;
        } else if (Nakama.keyboard.isDown(this.configs.down)) {
            this.sprite.body.velocity.y = Nakama.configs.shipSpeed;
        } else this.sprite.body.velocity.y = 0;
        //
        if (Nakama.keyboard.isDown(this.configs.left)) {
            this.sprite.body.velocity.x = -Nakama.configs.shipSpeed;
        } else if (Nakama.keyboard.isDown(this.configs.right)) {
            this.sprite.body.velocity.x = Nakama.configs.shipSpeed;
        } else this.sprite.body.velocity.x = 0;

        //fire
        if (this.sprite.alive) {
            this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
            if (Nakama.keyboard.isDown(this.configs.fire) &&
                this.timeSinceLastFire > this.configs.cooldown) {
                this.fire2();
                this.timeSinceLastFire = 0;
            }
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

    fire2() {
        new BulletController(
            this.sprite.position,
            "BulletType1.png",
            new Phaser.Point(0, -1), {
                bulletSpeed: 700,
                bulletGroup: Nakama.shipBulletGroup
            }
        );
        new BulletController(
            this.sprite.position,
            "BulletType1.png",
            new Phaser.Point(1, -2), {
                bulletSpeed: 700,
                bulletGroup: Nakama.shipBulletGroup
            }
        );
        new BulletController(
            this.sprite.position,
            "BulletType1.png",
            new Phaser.Point(-1, -2), {
                bulletSpeed: 700,
                bulletGroup: Nakama.shipBulletGroup
            }
        );
        new BulletController(
            this.sprite.position,
            "BulletType1.png",
            new Phaser.Point(1, -3), {
                bulletSpeed: 700,
                bulletGroup: Nakama.shipBulletGroup
            }
        );
        new BulletController(
            this.sprite.position,
            "BulletType1.png",
            new Phaser.Point(-1, -3), {
                bulletSpeed: 700,
                bulletGroup: Nakama.shipBulletGroup
            }
        );
    }

    fire() {
        if (Nakama.game.time.now > this.sprite.bulletTime) {

            var bullet = this.sprite.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(this.sprite.position.x + 20, this.sprite.position.y + 20);
                bullet.body.velocity.y = -700;
                this.sprite.bulletTime = Nakama.game.time.now + 100;
            }
        }
    }
}
