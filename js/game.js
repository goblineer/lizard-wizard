// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
  // player speed
  this.playerSpeed = 3;

  // player boundaries
  this.playerMinX = this.sys.game.config.width - 600;
  this.playerMinY = this.sys.game.config.height - 330;

  // initiating is not terminating 
  this.isTerminating = false;

  // keyboard control function
  cursors = this.input.keyboard.createCursorKeys();
};

// load assets
gameScene.preload = function(){
  // load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  // this.load.image('enemy', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
};

gameScene.create = function() {
  // create bg sprite
  let bg = this.add.sprite(0, 0, 'background');

  // change the origin to the top-left corner of the bg sprite
  bg.setOrigin(0,0);

  // create the player
  this.player = this.add.sprite(this.playerMinX, this.playerMinY, 'player');

  // increasing the width and height of player sprite by 150%
  this.player.setScale(1.5);

  // goal/treasure
  this.goal = this.add.sprite(this.sys.game.config.width - 240, this.sys.game.config.height / 2, 'goal');
  this.goal.setScale(0.6);

gameScene.update = function(){

  // don't execute if game is terminating
  if(this.isTerminating) return;

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
else if (cursors.down.isDown)
{
    this.player.y += this.playerSpeed;

    // player.anims.play('right', true);
}
else if (cursors.up.isDown)
{
    this.player.y += this.playerSpeed * -1;

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

//TODO: Fix a double animation bug

  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    // restart the Scene
    this.scene.restart();
  }, this);
}
};

// set the configuration of the game
let config = {
  type: Phaser.AUTO, 
  width: 640,
  height: 360,
  scene: gameScene,
  pixelArt: true
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
