class PlayerBulletType3Controller extends BulletController{
    constructor(position, anchor, owner, playerNumber){
        super(
            position,
            "BulletType3.png",
            new Phaser.Point(0, -1),
            Nakama.playerBulletGroup,
            playerNumber
        );
        this.owner = owner;
        this.sprite.anchor = anchor;
        this.sprite.body.velocity = 0;
        this.timeSinceLastFire = 0;
        this.bulletSpeed = 500;
    }

    update(){
        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        if(this.timeSinceLastFire > 0.1){
            this.sprite.kill();
            this.timeSinceLastFire = 0;
        }
        if(this.sprite.alive){
            this.sprite.position = this.owner.position;
        }
    }

}
