class PlayerType3ShipController extends ShipController {
    constructor(x, y, shipType, configs) {
        super(
            x,
            y,
            "Spaceship3-Player.png",
            configs
        );

        this.configs.missileCooldown = 0.3;
        this.configs.cooldown = 0.1;
        this.configs.frameNameDefault = "Spaceship3-" + shipType + ".png";
        this.configs.frameNameLeft = "Spaceship3Left-" + shipType + ".png";
        this.configs.frameNameRight = "Spaceship3Right-" + shipType + ".png";
    }

    fire() {
        if (!this.sprite.alive) return;

        this.initPlayerBullet(new Phaser.Point(1, 1));
        this.initPlayerBullet(new Phaser.Point(0, 1));
    }

    initPlayerBullet(anchor) {
      Nakama.bullets.push(
        new PlayerBulletType3Controller(
            this.sprite.position,
            anchor,
            this.sprite,
            this.configs.playerNumber
            )
          );
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
}
