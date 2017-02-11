class PlayerMissileController extends BulletController {
    constructor(position, direction, launchDirection, playerNumber) {
        super(position, "BulletType2Upgraded.png", direction, Nakama.missileGroup,
            playerNumber
        );
        this.sprite.TURN_RATE = 5;
        this.sprite.SPEED = 900;

        this.launchDirection = launchDirection;

        this.timeSinceLaunched = 0;
        this.STARTING_TIME = 0.4;
    }

    update() {
        if (this.timeSinceLaunched <= this.STARTING_TIME) {
            this.timeSinceLaunched += Nakama.game.time.physicsElapsed;
            this.launchAngle = Math.atan2(this.launchDirection.x, this.launchDirection.y);
            this.sprite.body.velocity.x = 400 * Math.cos(this.launchAngle) * Math.cos(Math.PI * 0.5 * this.timeSinceLaunched / this.STARTING_TIME);
            this.sprite.body.velocity.y = 400 * Math.sin(this.launchAngle) * Math.cos(Math.PI * 0.5 * this.timeSinceLaunched / this.STARTING_TIME);
            this.lockEnemy();
        } else if (this.sprite.alive && this.closestEnemy !== -1) {
            if (Nakama.enemyGroup.children[this.closestEnemy].alive) {
                this.sprite.targetAngle = Nakama.game.math.angleBetween(
                    this.sprite.position.x, this.sprite.position.y,
                    Nakama.enemyGroup.children[this.closestEnemy].position.x, Nakama.enemyGroup.children[this.closestEnemy].position.y
                )

                this.sprite.targetAngle += Math.PI / 2;

                if (this.sprite.rotation !== this.sprite.targetAngle) {
                    this.sprite.delta = this.sprite.targetAngle - this.sprite.rotation;

                    // Keep it in range from -180 to 180 to make the most efficient turns.
                    if (this.sprite.delta > Math.PI) {
                        this.sprite.delta -= Math.PI * 2;
                    }
                    if (this.sprite.delta < -Math.PI) {
                        this.sprite.delta += Math.PI * 2;
                    }

                    if (this.sprite.delta > 0) {
                        // Turn clockwise
                        this.sprite.angle += this.sprite.TURN_RATE;
                    } else {
                        // Turn counter-clockwise
                        this.sprite.angle -= this.sprite.TURN_RATE;
                    }

                    // Just set angle to target angle if they are close
                    if (Math.abs(this.sprite.delta) < Nakama.game.math.degToRad(this.sprite.TURN_RATE)) {
                        this.sprite.rotation = this.sprite.targetAngle;
                    }
                }

                // Calculate velocity vector based on this.rotation and this.SPEED
                this.sprite.body.velocity.x = Math.cos(this.sprite.rotation - Math.PI / 2) * this.sprite.SPEED;
                this.sprite.body.velocity.y = Math.sin(this.sprite.rotation - Math.PI / 2) * this.sprite.SPEED;
            }
        } else if (this.sprite.alive && this.closestEnemy === -1) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = -this.sprite.SPEED;
        }
    }

    lockEnemy() {
        this.closestEnemy = -1;
        var distanceToEnemy = 1000000;
        for (var i = 0; i < Nakama.enemyGroup.children.length; i++) {
            if (Nakama.enemyGroup.children[i].alive && distanceToEnemy > Nakama.game.math.distance(this.sprite.position.x, this.sprite.position.y, Nakama.enemyGroup.children[i].position.x, Nakama.enemyGroup.children[i].position.y)) {
                this.closestEnemy = i;
            }
        }
    }
}
