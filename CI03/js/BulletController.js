class BulletController {
    constructor(position, spriteName, direction, physicsGroup, playerNumber) {
        this.sprite = physicsGroup.create(
            position.x,
            position.y,
            "assets",
            spriteName
        );

        this.playerNumber = playerNumber;
        this.bulletSpeed = Nakama.configs.bulletSpeed;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        if(playerNumber == 1) {
            this.sprite.bulletStrength = Nakama.configs.player1Controller.bulletStrength;
        } else if (playerNumber == 2){
            this.sprite.bulletStrength = Nakama.configs.player2Controller.bulletStrength;
        } else this.sprite.bulletStrength = Nakama.configs.enemyBulletStrength;

        this.sprite.angle = -Math.tan(
          direction.x / direction.y
        ) * 180 / Math.PI;
        this.sprite.body.velocity = direction.setMagnitude(this.bulletSpeed);

    }
}
