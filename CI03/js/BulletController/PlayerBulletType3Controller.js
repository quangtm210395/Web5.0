class PlayerBulletType3Controller extends BulletController{
    constructor(position, direction, configs){
        super(
            position,
            "BulletType3.png",
            direction,
            Nakama.playerBulletGroup,
            configs
        );
    }

}
