class PlayerBulletType2Controller extends BulletController{
    constructor(position, direction, playerNumber){
        super(
            position,
            "BulletType2.png",
            direction,
            Nakama.playerBulletGroup,
            playerNumber
        );
        this.bulletSpeed = 700;
    }

}
