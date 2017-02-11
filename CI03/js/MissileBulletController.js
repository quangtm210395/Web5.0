class MissileBulletController {

    constructor(position, enemies, configs) {
        this.configs = configs;
        this.enemy = enemies;
        this.sprite = Nakama.missileGroup.create(
            position.x,
            position.y,
            "assets",
            "BulletType2Upgraded.png"
        );

        this.sprite.bulletStrength = configs.bulletStrength;

        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;

        // if (configs.radius != 0) {
        //     this.sprite.body.setCircle(configs.radius, this.sprite.width / 2 - configs.radius,
        //         this.sprite.height / 2 - configs.radius);
        // }

        // this.sprite.body.velocity = (new Phaser.Point(0, -1)).setMagnitude(Nakama.configs.bulletSpeed);
        this.TURN_RATE = 5;


    }

    calDistance(enemy) {
        var x1 = this.sprite.position.x;
        var y1 = this.sprite.position.y;
        var x2 = enemy.sprite.position.x;
        var y2 = enemy.sprite.position.y;
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    nearestEnemy(){
        var minDistance = this.calDistance(Nakama.enemies[0]);
        var checker = 0;
        for(var i = 1; i < Nakama.enemies.length; i++){
            if(minDistance < this.calDistance(Nakama.enemies[i])){
                minDistance = this.calDistance(Nakama.enemies[i]);
                checker = i;
            }
        }
        return Nakama.enemies[checker];
    }

    update() {
        var enemy = this.nearestEnemy();
        // if (enemy.sprite.alive) {
            var targetAngle = Nakama.game.math.angleBetween(
                this.sprite.position.x, this.sprite.position.y,
                enemy.sprite.position.x, enemy.sprite.position.y
            );

            if (this.sprite.rotation !== targetAngle) {
                var delta = targetAngle - this.sprite.rotation;


                if (delta > Math.PI) delta -= Math.PI * 2;
                if (delta < -Math.PI) delta += Math.PI * 2;


                if (delta > 0) {
                    this.sprite.angle += this.TURN_RATE;
                } else {
                    this.sprite.angle -= this.TURN_RATE;
                }

                if (Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)) {
                    this.sprite.rotation = targetAngle;
                }
            // }
        }
        this.sprite.body.velocity.x = Math.cos(this.sprite.rotation) * this.configs.bulletSpeed;
        this.sprite.body.velocity.y = Math.sin(this.sprite.rotation) * this.configs.bulletSpeed;
    }
}
