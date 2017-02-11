class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.playerGroup.create(
            x,
            y,
            "assets",
            spriteName
        );
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.health = configs.health;
        this.sprite.body.collideWorldBounds = true;

        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.timeSinceLastMissileFire = 0;
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
            this.sprite.frameName = this.configs.frameNameLeft;
            this.sprite.body.velocity.x = -Nakama.configs.shipSpeed;
        } else if (Nakama.keyboard.isDown(this.configs.right)) {
            this.sprite.frameName = this.configs.frameNameRight;
            this.sprite.body.velocity.x = Nakama.configs.shipSpeed;
        } else {
            this.sprite.frameName = this.configs.frameNameDefault;
            this.sprite.body.velocity.x = 0;
        }

        //fire
        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        if (Nakama.keyboard.isDown(this.configs.fire) &&
            this.timeSinceLastFire > this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }

        //fireMissile
        this.timeSinceLastMissileFire += Nakama.game.time.physicsElapsed;
        if (Nakama.keyboard.isDown(this.configs.m) &&
            this.timeSinceLastMissileFire > this.configs.missileCooldown) {
            this.fireMissile();
            this.timeSinceLastMissileFire = 0;
        }

    }

    fireMissile() {
        if (!this.sprite.alive) return;

        this.initMissileBullet(new Phaser.Point(0, -1), new Phaser.Point(1, 1));
        this.initMissileBullet(new Phaser.Point(0, -1), new Phaser.Point(1, -1));
    }

    initMissileBullet(direction, launchDirection) {
      Nakama.missiles.push(
        new PlayerMissileController(
            this.sprite.position,
            direction,
            launchDirection,
            this.configs.playerNumber
        ));
    }

    fire() {
        if (!this.sprite.alive) return;

        this.initPlayerBullet(new Phaser.Point(1, -2.5));
        this.initPlayerBullet(new Phaser.Point(0, -1));
        this.initPlayerBullet(new Phaser.Point(1, -5));
        this.initPlayerBullet(new Phaser.Point(-1, -5));
        this.initPlayerBullet(new Phaser.Point(-1, -2.5));


    }

    initPlayerBullet(direction) {
        new PlayerBulletType1Controller(
            this.sprite.position,
            direction,
            this.configs.playerNumber
            );
    }

    // fire() {
    //     if (Nakama.game.time.now > this.sprite.bulletTime) {
    //
    //         var bullet = this.sprite.bullets.getFirstExists(false);
    //         if (bullet) {
    //             bullet.reset(this.sprite.position.x + 20, this.sprite.position.y + 20);
    //             bullet.body.velocity.y = -700;
    //             this.sprite.bulletTime = Nakama.game.time.now + 100;
    //         }
    //     }
    // }
    // setupBullets() {
    //     this.sprite.bulletTime = 0;
    //     this.sprite.bullets = Nakama.game.add.group();
    //     this.sprite.bullets.enableBody = true;
    //     this.sprite.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //     this.sprite.bullets.createMultiple(50, 'assets', "BulletType1.png");
    //     this.sprite.bullets.setAll('anchor.x', 0.5);
    //     this.sprite.bullets.setAll('anchor.y', 1);
    //     this.sprite.bullets.setAll('outOfBoundsKill', true);
    //     this.sprite.bullets.setAll('checkWorldBounds', true);
    // }
}
