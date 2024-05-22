import Phaser from 'phaser';
import tileset from '../assets/tileset_32px.png';
import characterImage from '../assets/character.png';
import characterData from '../assets/character.json';
import tileMap from '../assets/tileMap.json';

export default class MainScene extends Phaser.Scene {
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  private _showDebug: boolean = false;

  private _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;


  private get cursors(): Phaser.Types.Input.Keyboard.CursorKeys | null {
    return this._cursors;
  }

  private set cursors(val: Phaser.Types.Input.Keyboard.CursorKeys | null) {
    this._cursors = val;
  }

  private get showDebug(): boolean {
    return this._showDebug;
  }

  private set showDebug(val: boolean) {
    this._showDebug = val;
  }

  private get player(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null {
    return this._player;
  }

  private set player(val: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null) {
    this._player = val;
  }


  constructor() {
    super({
      key: 'MainMap',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 }
        }
      }
    });

    this.cursors = null;
    this.player = null;
    this.showDebug = false;
  }

  preload(): void {
    this.load.image('tiles', tileset);
    this.load.tilemapTiledJSON('map', tileMap);
    this.load.atlas('atlas', characterImage, characterData);
  }

  create(): void {
    const map = this.make.tilemap({ key: 'map' });

    const tileset = map.addTilesetImage('tiles', 'tiles')!;

    // Ground
    map.createLayer('Below Player', tileset, 0, 0)!;
    // Buildings
    const worldLayer = map.createLayer('World', tileset, 0, 0)!;
    const aboveLayer = map.createLayer('Above Player', tileset, 0, 0)!;

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point')!;
    this.player = this.physics.add.sprite(spawnPoint.x as number, spawnPoint.y as number, 'atlas', 'misa-front')
      .setSize(30, 40)
      .setOffset(0, 24);

    this.physics.add.collider(this.player,
      worldLayer);

    const { anims } = this;
    anims.create({
      key: 'misa-left-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: 'misa-right-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: 'misa-front-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: 'misa-back-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-back-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update(): void {
    const speed = 175;
    const prevVelocity = this.player!.body.velocity.clone();

    this.player!.body.setVelocity(0);

    if (this.cursors!.left.isDown) {
      this.player!.body.setVelocityX(-speed);
    } else if (this.cursors!.right.isDown) {
      this.player!.body.setVelocityX(speed);
    }

    if (this.cursors!.up.isDown) {
      this.player!.body.setVelocityY(-speed);
    } else if (this.cursors!.down.isDown) {
      this.player!.body.setVelocityY(speed);
    }

    this.player!.body.velocity.normalize().scale(speed);

    if (this.cursors!.left.isDown) {
      this.player!.anims.play('misa-left-walk', true);
    } else if (this.cursors!.right.isDown) {
      this.player!.anims.play('misa-right-walk', true);
    } else if (this.cursors!.up.isDown) {
      this.player!.anims.play('misa-back-walk', true);
    } else if (this.cursors!.down.isDown) {
      this.player!.anims.play('misa-front-walk', true);
    } else {
      this.player!.anims.stop();

      if (prevVelocity.x < 0) {
        this.player!.setTexture('atlas', 'misa-left');
      } else if (prevVelocity.x > 0) {
        this.player!.setTexture('atlas', 'misa-right');
      } else if (prevVelocity.y < 0) {
        this.player!.setTexture('atlas', 'misa-back');
      } else if (prevVelocity.y > 0) {
        this.player!.setTexture('atlas', 'misa-front');
      }
    }
  }
}

