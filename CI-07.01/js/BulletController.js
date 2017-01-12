class BulletController {
    constructor(position, spriteName, direction, configs) {
        this.sprite = configs.bulletGroup.create(
            position.x,
            position.y,
            "assets",
            spriteName
        );

        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;

        this.sprite.body.velocity = direction.setMagnitude(this.configs.bulletSpeed);
    }
}
