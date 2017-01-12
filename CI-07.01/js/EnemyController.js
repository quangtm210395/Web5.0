class EnemyController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.enemyGroup.create(
            x,
            y,
            "assets",
            spriteName
        );
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;

        this.configs = configs;
        this.timeSinceLastFire = 0;
    }

    update() {
        if (this.configs.moveLeft) {
            this.sprite.body.velocity.x = -this.configs.enemySpeed;
        } else {
            this.sprite.body.velocity.x = this.configs.enemySpeed;
        }

        if (this.sprite.body.position.x == 0) {
            this.configs.moveLeft = false;
        }
        if (this.sprite.body.position.x == 590) {
            this.configs.moveLeft = true;
        }

        //fire
        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        if (this.timeSinceLastFire > this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }

    fire() {
        new BulletController(
            this.sprite.position,
            "EnemyBulletType1.png",
            new Phaser.Point(0, 1), {
                bulletSpeed: this.configs.bulletSpeed,
                bulletGroup: Nakama.enemyBulletGroup
            }
        );
    }
}
