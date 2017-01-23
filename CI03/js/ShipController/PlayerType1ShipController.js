class PlayerType1ShipController extends ShipController{
    constructor(x,y,configs){
        super(
          x,
          y,
          "Spaceship1-Player.png",
          configs
        );

        this.configs.frameNameDefault = "Spaceship1-Player.png";
        this.configs.frameNameLeft = "Spaceship1Left-Player.png";
        this.configs.frameNameRight = "Spaceship1Right-Player.png";
    }

}
