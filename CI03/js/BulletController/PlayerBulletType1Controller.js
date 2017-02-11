class PlayerBulletType1Controller extends BulletController{
    constructor(position, direction, playerNumber){
        super(
            position,
            "BulletType1.png",
            direction,
            Nakama.playerBulletGroup,
            playerNumber
        );
        this.bulletSpeed = 700;
    }

}
