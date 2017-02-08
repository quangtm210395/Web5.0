class PlayerType1ShipController extends ShipController{
    constructor(x, y, shipType, configs){
        super(
          x,
          y,
          "Spaceship1-Player.png",
          configs
        );
        this.configs.missileCooldown = 0.3;
        this.configs.cooldown = 0.1;
        this.configs.health = 10;
        this.configs.frameNameDefault = "Spaceship1-" + shipType + ".png";
        this.configs.frameNameLeft = "Spaceship1Left-" + shipType + ".png";
        this.configs.frameNameRight = "Spaceship1Right-" + shipType + ".png";
    }

    fire() {
        if (!this.sprite.alive) return;

        this.initPlayerBulletType1(new Phaser.Point(1, -2.5));
        this.initPlayerBulletType1(new Phaser.Point(0, -1));
        this.initPlayerBulletType1(new Phaser.Point(1, -5));
        this.initPlayerBulletType1(new Phaser.Point(-1, -5));
        this.initPlayerBulletType1(new Phaser.Point(-1, -2.5));
    }

    initPlayerBulletType1(direction) {
        new PlayerBulletType1Controller(
            this.sprite.position,
            direction, {
                bulletSpeed: 700,
                bulletStrength: 1
            });
    }
}
