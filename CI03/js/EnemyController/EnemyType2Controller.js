class EnemyType2Controller extends EnemyController {
    constructor(x, y, configs) {
        configs.bulletSpriteName = "EnemyBulletType2.png";
        configs.cooldown = 0.9;
        configs.enemySpeed = 500;
        configs.bulletSpeed = 400;
        configs.minX = 100;
        configs.maxX = Nakama.configs.gameWidth;
        configs.tweenTime = 3;
        configs.health = 5;

        super(
            x,
            y,
            "EnemyType2.png",
            configs
        );
    }

}
