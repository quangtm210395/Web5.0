var Nakama = {};
Nakama.configs = {};


window.onload = function() {
    Nakama.game = new Phaser.Game(640, 960, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }, false, false);
}

// preparations before game starts
var preload = function() {
    Nakama.game.scale.minWidth = 320;
    Nakama.game.scale.minHeight = 480;
    Nakama.game.scale.maxWidth = 640;
    Nakama.game.scale.maxHeight = 960;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function() {

    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;

    Nakama.map = Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');
    Nakama.mapSpeed = 7;
    Nakama.playerSpeed = 8;

    Nakama.player = Nakama.game.add.sprite(
        Nakama.game.world.centerX - 36,
        Nakama.game.world.centerY + 200,
        "assets",
        "Spaceship1-Player.png"
    );
    Nakama.game.physics.arcade.enable(Nakama.player);

//  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

//setup bullets
    Nakama.bulletTime = 0;
    Nakama.bullets = Nakama.game.add.group();
    Nakama.bullets.enableBody = true;
    Nakama.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    Nakama.bullets.createMultiple(50, 'assets', "BulletType1.png");
    Nakama.bullets.setAll('anchor.x', 0.5);
    Nakama.bullets.setAll('anchor.y', 1);
    Nakama.bullets.setAll('outOfBoundsKill', true);
    Nakama.bullets.setAll('checkWorldBounds', true);

}

// update game state each frame
var update = function() {


  //scrolling map
    Nakama.map.tilePosition.y += Nakama.mapSpeed;

    if (Nakama.keyboard.isDown(Phaser.Keyboard.UP)) {
        if (Nakama.player.position.y >= Nakama.playerSpeed)
            Nakama.player.position.y -= Nakama.playerSpeed;
        else
            Nakama.player.position.y = 0;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        if (Nakama.player.position.y <= (950 - 78))
            Nakama.player.position.y += Nakama.playerSpeed;
        else
            Nakama.player.position.y = 960 - 78;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      Nakama.player.animations.add()
        if (Nakama.player.position.x >= Nakama.playerSpeed)
            Nakama.player.position.x -= Nakama.playerSpeed;
        else
            Nakama.player.position.x = 0;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        if (Nakama.player.position.x <= (630 - 78))
            Nakama.player.position.x += Nakama.playerSpeed;
        else
            Nakama.player.position.x = 640 - 78;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        fire();
    }


}

function fire() {

    if (Nakama.game.time.now > Nakama.bulletTime) {

        bullet = Nakama.bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(Nakama.player.position.x + 39 , Nakama.player.position.y);
            bullet.body.velocity.y = -700;
            Nakama.bulletTime = Nakama.game.time.now + 100;
        }
    }
}

// before camera render (mostly for debug)
var render = function() {}
