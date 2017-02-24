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
        + (this.configs.movementDistance / 2)
        * Math.sin(
          (this.timeSinceSpawn / this.configs.tweenTime) *Math.PI * 2 );


        //fire
        if (this.sprite.alive) {
            this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
            if (this.timeSinceLastFire > this.configs.cooldown) {
                // this.fire();
                this.timeSinceLastFire = 0;
            }
        }
    }

    fire() {
        new BulletController(
            this.sprite.position,
            this.configs.bulletSpriteName,
            new Phaser.Point(0, 1),
            Nakama.enemyBulletGroup,
            0
        );
    }
}
