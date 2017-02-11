class EnemyType1Controller extends EnemyController {
    constructor(x, y, configs) {
        configs.bulletSpriteName = "EnemyBulletType1.png";
        configs.cooldown = 0.6;
        configs.enemySpeed = 300;
        configs.bulletSpeed = 500;
        configs.minX = 0;
        configs.maxX = Nakama.configs.gameWidth - 100;
        configs.tweenTime = 4;
        configs.health = 5;

        super(
            x,
            y,
            "EnemyType1.png",
            configs
        );
    }

}
