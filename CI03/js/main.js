var Nakama = {};
Nakama.configs = {
    bulletSpeed: 700,
    shipSpeed: 700,
    mapSpeed: 5,
    gameWidth: 640,
    gameHeight: 960,
    player1Controller : {
       up: Phaser.Keyboard.UP,
       down: Phaser.Keyboard.DOWN,
       left: Phaser.Keyboard.LEFT,
       right: Phaser.Keyboard.RIGHT,
       fire: Phaser.Keyboard.SPACEBAR,
       m : Phaser.Keyboard.M,

   },
   player2Controller : {
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S,
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      fire: Phaser.Keyboard.ENTER,
      m : Phaser.Keyboard.G
  }
};


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

    Nakama.playerBulletGroup = Nakama.game.add.physicsGroup();
    Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
    Nakama.playerGroup = Nakama.game.add.physicsGroup();
    Nakama.enemyGroup = Nakama.game.add.physicsGroup();
    Nakama.missileGroup = Nakama.game.add.physicsGroup();

    Nakama.missiles = [];
    Nakama.bullets = [];
    // players
    Nakama.players = [];
    Nakama.players.push(
        new PlayerType1ShipController(
            Nakama.game.world.centerX - 36 + 50,
            Nakama.game.world.centerY + 200,
            "Player",
            Nakama.configs.player1Controller
        )
    );
    Nakama.players.push(
        new PlayerType3ShipController(
            Nakama.game.world.centerX - 36 - 50,
            Nakama.game.world.centerY + 200,
            "Partner",
            Nakama.configs.player2Controller
        )
    );

    //enemies
    Nakama.enemies = [];
    Nakama.enemies.push(
        new EnemyType2Controller(
            Nakama.game.world.centerX - 25 - 50,
            Nakama.game.world.centerY - 350,
             {
                bulletSpriteName  : "EnemyBulletType1.png",
                cooldown: 0.6,
                enemySpeed: 300,
                bulletSpeed: 500,
                minX : 100,
                maxX : Nakama.configs.gameWidth - 100,
                tweenTime : 3,
                health : 5
            }
        )
    );
    Nakama.enemies.push(
        new EnemyType1Controller(
            Nakama.game.world.centerX - 25 + 50,
            Nakama.game.world.centerY - 400,
             {
                bulletSpriteName  : "EnemyBulletType2.png",
                cooldown: 0.5,
                enemySpeed: 300,
                bulletSpeed: 500,
                minX : 100,
                maxX : Nakama.configs.gameWidth - 100,
                tweenTime : 4,
                health : 5
            }
        )
    );

}


// update game state each frame
var update = function() {
    //scrolling map
    Nakama.map.tilePosition.y += Nakama.configs.mapSpeed;

    Nakama.game.physics.arcade.overlap(Nakama.enemyBulletGroup, Nakama.playerGroup, bulletPlayerCollider, null, this);
    Nakama.game.physics.arcade.overlap(Nakama.playerBulletGroup, Nakama.enemyGroup, bulletEnemyCollider, null, this);
    Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.enemyGroup, playerEnemyCollider, null, this);

    Nakama.players.forEach(function(player){
      player.update();
    });
    Nakama.enemies.forEach(function(enemy){
      enemy.update();
    });
    Nakama.missiles.forEach(function(missile){
      missile.update();
    });
    Nakama.bullets.forEach(function(bullet){
      bullet.update();
    });


}

var bulletPlayerCollider = function(bulletSprite, playerSprite) {
    bulletSprite.kill();
    playerSprite.damage(bulletSprite.bulletStrength);
}

var bulletEnemyCollider = function(bulletSprite, enemySprite) {
    bulletSprite.kill();
    enemySprite.damage(bulletSprite.bulletStrength);
}

var playerEnemyCollider = function(playerSprite, enemySprite) {
    playerSprite.kill();
    enemySprite.kill();
}


// before camera render (mostly for debug)
var render = function() {}
