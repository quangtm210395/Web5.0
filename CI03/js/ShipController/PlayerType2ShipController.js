class PlayerType2ShipController extends ShipController {
    constructor(x, y, shipType, configs) {
        super(
            x,
            y,
            "Spaceship2-Player.png",
            configs
        );

        this.configs.missileCooldown = 0.3;
        this.configs.cooldown = 0.1;
        this.configs.health = 10;
        this.configs.frameNameDefault = "Spaceship2-" + shipType + ".png";
        this.configs.frameNameLeft = "Spaceship2Left-" + shipType + ".png";
        this.configs.frameNameRight = "Spaceship2Right-" + shipType + ".png";
    }

    fire() {
        if (!this.sprite.alive) return;

        this.initPlayerBulletType2(new Phaser.Point(1, -2.5));
        this.initPlayerBulletType2(new Phaser.Point(0, -1));
        this.initPlayerBulletType2(new Phaser.Point(1, -5));
        this.initPlayerBulletType2(new Phaser.Point(-1, -5));
        this.initPlayerBulletType2(new Phaser.Point(-1, -2.5));
    }

    initPlayerBulletType2(direction) {
        new PlayerBulletType2Controller(
            this.sprite.position,
            direction, {
                bulletSpeed: 700,
                bulletStrength: 1
            });
    }
}
