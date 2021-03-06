class EnemyController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.enemyGroup.create(
            x,
            y,
            "assets",
            spriteName
        );
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.health = configs.health;
        this.sprite.body.collideWorldBounds = true;

        this.configs = configs;
        this.configs.centerX = (this.configs.minX + this.configs.maxX)/2;
        this.configs.movementDistance = this.configs.maxX - this.configs.minX;
        this.timeSinceLastFire = 0;
        this.timeSinceSpawn = 0;
    }

    update() {

      this.timeSinceSpawn += Nakama.game.time.physicsElapsed;
      this.sprite.position.x =
        this.configs.centerX
        + (this.configs.movementDistance)
        * Math.sin(
          (this.timeSinceSpawn / this.configs.tweenTime) *Math.PI * 2 )
           / 2;

        // if (this.configs.moveLeft) {
        //     this.sprite.body.velocity.x = -this.configs.enemySpeed;
        // } else {
        //     this.sprite.body.velocity.x = this.configs.enemySpeed;
        // }
        //
        // if (this.sprite.body.position.x == 0) {
        //     this.configs.moveLeft = false;
        // }
        // if (this.sprite.body.position.x == Nakama.configs.gameWidth - 50) {
        //     this.configs.moveLeft = true;
        // }

        //fire
        if (this.sprite.alive) {
            this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
            if (this.timeSinceLastFire > this.configs.cooldown) {
                this.fire();
                this.timeSinceLastFire = 0;
            }
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
