let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  this.playerSpeed = 3;
  this.playerMinX = this.sys.game.config.width - 610;
  this.playerMinY = this.sys.game.config.height - 330;
  this.isTerminating = false;
  cursors = this.input.keyboard.createCursorKeys();
};

// callbacks for preload

gameScene.preload = function() {
  this.load.image('tiles', 'assets/tiles.png');
  this.load.image('background', 'assets/background.png');
  this.load.tilemapTiledJSON('map', 'assets/basemap.json');
  this.load.spritesheet('player', 'assets/spritesheet.png', {
    frameWidth: 28,
    frameHeight: 28
  });
};

// create runs once

gameScene.create = function() {
  map = this.make.tilemap({ key: 'map' });
  let tileset = map.addTilesetImage('background');
  let blocked = map.createStaticLayer('blocked', tileset, 0, 0);
  blocked.setCollisionByProperty({ blocked: true });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  //bring in a sprite and put it at the starting postition

  this.player = this.physics.add.sprite(
    this.playerMinX,
    this.playerMinY,
    'player'
  );

  //sprite can't go through walls

  this.physics.add.collider(this.player, blocked);
};

// update runs continuously

gameScene.update = function() {
  if (this.isTerminating) return;

  this.make.text({
    x: 480,
    y: 32,
    text:
      'Look at this glorious text and its intelligent wordwrapping properties!',
    style: {
      font: '24px Arial',
      fill: 'white',
      wordWrap: { width: 150, useAdvancedWrap: true }
    }
  });

  //navigate with keyboard arrows

  if (cursors.left.isDown) {
    this.player.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    this.player.body.setVelocityX(100);
  } else if (cursors.down.isDown) {
    this.player.body.setVelocityY(100);
  } else if (cursors.up.isDown) {
    this.player.body.setVelocityY(-100);
  } else {
    this.player.body.setVelocity(0);
  }

  //animate sprite
  //TODO: set animations so when two directions are pressed at the same time, the best anim shows

  if (cursors.left.isDown) {
    this.player.anims.play('walk', true);
    this.player.angle = 180;
  } else if (cursors.right.isDown) {
    this.player.anims.play('walk', true);
    this.player.angle = 0;
  } else if (cursors.up.isDown) {
    this.player.anims.play('walk', true);
    this.player.angle = -90;
  } else if (cursors.down.isDown) {
    this.player.anims.play('walk', true);
    this.player.angle = 90;
  } else {
    this.player.anims.stop();
  }
};

//set parameters for game

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: gameScene,
  pixelArt: true
};

//create game and pass the parameters as config to the new instance

let game = new Phaser.Game(config);
