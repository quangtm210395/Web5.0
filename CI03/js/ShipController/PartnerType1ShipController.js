class PartnerType1ShipController extends ShipController{
    constructor(x,y,configs){
        super(
          x,
          y,
          "Spaceship1-Partner.png",
          configs
        );

        this.configs.missileCooldown = 0.3;
        this.configs.cooldown = 0.1;
        this.configs.health = 10;
        this.configs.frameNameDefault = "Spaceship1-Partner.png";
        this.configs.frameNameLeft = "Spaceship1Left-Partner.png";
        this.configs.frameNameRight = "Spaceship1Right-Partner.png";
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
