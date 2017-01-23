class PlayerBulletType2Controller extends BulletController{
    constructor(position, direction, configs){
        super(
            position,
            "BulletType2.png",
            direction,
            Nakama.playerBulletGroup,
            configs
        );
    }

}
