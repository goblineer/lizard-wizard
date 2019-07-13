// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
  // player speed
  this.playerSpeed = 3;

  // enemy speed
  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 4.5;

  // boundaries
  this.enemyMinY = 80;
  this.enemyMaxY = 280;

  // we are not terminating
  this.isTerminating = false;

  // keyboard control function
  cursors = this.input.keyboard.createCursorKeys();
};

// load assets
gameScene.preload = function(){
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
};

// called once after the preload ends
gameScene.create = function() {
  // create bg sprite
  let bg = this.add.sprite(0, 0, 'background');

  // change the origin to the top-left corner
  bg.setOrigin(0,0);

  // create the player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  // we are increasing the width and height by 150%
  this.player.setScale(1.5);

  // goal
  this.goal = this.add.sprite(this.sys.game.config.width - 240, this.sys.game.config.height / 2, 'goal');
  this.goal.setScale(0.6);

  // enemy group
  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 3,
    setXY: {
      x: 90,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  // setting scale to all group elements
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), .01, .01);

  // set flipX, and speed
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
    // flip enemy
    enemy.flipX = true;
    enemy.setScale(.25)

    // set speed
    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    enemy.speed = dir * speed;

  }, this);
};

// this is called up to 60 times per second
gameScene.update = function(){

  // don't execute if we are terminating
  if(this.isTerminating) return;

  // check for active input (left click / touch)
  if(this.input.activePointer.isDown) {
    // player walks
    this.player.x += this.playerSpeed;
  }

  // check for cursor keydown events and apply to player

  if (cursors.left.isDown)
{
    this.player.x += this.playerSpeed * -1;

    // player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    this.player.x += this.playerSpeed;

    // player.anims.play('right', true);
}
else
{
    this.player.x += 0;

    // player.anims.play('turn');
}

  // treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();

  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log('reached goal!');

    // end game
    return this.gameOver();
  }

  // get enemies
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for(let i = 0; i< numEnemies; i++) {

    // enemy movement
    enemies[i].y += enemies[i].speed;

    // check we haven't passed min or max Y
    let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
    let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

    // if we passed the upper or lower limit, reverse
    if(conditionUp || conditionDown) {
      enemies[i].speed *= -.5;
    }

    // check enemy overlap
    let enemyRect = enemies[i].getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      console.log('Game over!');

      // end game
      return this.gameOver();
    }
  }
};

gameScene.gameOver = function() {

  // initiated game over sequence
  this.isTerminating = true;

  // shake camera
  this.cameras.main.shake(500);

  // listen for event completion
  this.cameras.main.on('camerashakecomplete', function(camera, effect){

    // fade out
    this.cameras.main.fade(500);
  }, this);

  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    // restart the Scene
    this.scene.restart();
  }, this);


};

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 640,
  height: 360,
  scene: gameScene,
  pixelArt: true
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
