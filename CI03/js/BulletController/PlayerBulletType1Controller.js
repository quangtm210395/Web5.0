class PlayerBulletType1Controller extends BulletController{
    constructor(position, direction, configs){
        super(
            position,
            "BulletType1.png",
            direction,
            Nakama.playerBulletGroup,
            configs
        );
    }

}
