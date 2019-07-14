let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  this.playerSpeed = 3;
  this.playerMinX = this.sys.game.config.width - 600;
  this.playerMinY = this.sys.game.config.height - 330;
  this.isTerminating = false;
  cursors = this.input.keyboard.createCursorKeys();
};

gameScene.preload = function() {
  this.load.image('tiles', 'assets/tiles.png');
  this.load.image('bg', 'assets/background.png');
  this.load.tilemapTiledJSON('map', 'assets/basemap.json');
  this.load.image('player', 'assets/player.png');
};

gameScene.create = function() {
  map = this.make.tilemap({ key: 'map' });
  let tileset = map.addTilesetImage('tiles');
  let blocked = map.createStaticLayer('blocked', tileset, 8, 8);
  let bg = this.add.sprite(0, 0, 'bg');
  bg.setOrigin(0, 0);
  this.player = this.add.sprite(this.playerMinX, this.playerMinY, 'player');
  this.physics.add.collider(this.player, blocked);
};

gameScene.update = function() {
  if (this.isTerminating) return;
  if (cursors.left.isDown) {
    this.player.x += this.playerSpeed * -1;
  } else if (cursors.right.isDown) {
    this.player.x += this.playerSpeed;
  } else if (cursors.down.isDown) {
    this.player.y += this.playerSpeed;
  } else if (cursors.up.isDown) {
    this.player.y += this.playerSpeed * -1;
  } else {
    this.player.x += 0;
  }
};

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: gameScene,
  pixelArt: true
};

let game = new Phaser.Game(config);
