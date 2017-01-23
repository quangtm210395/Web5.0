class PlayerType2ShipController extends ShipController {
    constructor(x, y, configs) {
        super(
            x,
            y,
            "Spaceship2-Player.png",
            configs
        );

        this.configs.frameNameDefault = "Spaceship2-Player.png";
        this.configs.frameNameLeft = "Spaceship2Left-Player.png";
        this.configs.frameNameRight = "Spaceship2Right-Player.png";
    }
}
