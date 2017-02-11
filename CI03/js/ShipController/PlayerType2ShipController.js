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
        this.configs.frameNameDefault = "Spaceship2-" + shipType + ".png";
        this.configs.frameNameLeft = "Spaceship2Left-" + shipType + ".png";
        this.configs.frameNameRight = "Spaceship2Right-" + shipType + ".png";
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
        new PlayerBulletType2Controller(
            this.sprite.position,
            direction,
            this.configs.playerNumber
            );
    }
}
