class BulletController {
    constructor(position, spriteName, direction, physicsGroup, configs) {
        this.sprite = physicsGroup.create(
            position.x,
            position.y,
            "assets",
            spriteName
        );

        this.configs = configs;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.bulletStrength = configs.bulletStrength;

        this.sprite.angle = -Math.tan(
          direction.x / direction.y
        ) * 180 / Math.PI;
        this.sprite.body.velocity = direction.setMagnitude(this.configs.bulletSpeed);

    }
}
