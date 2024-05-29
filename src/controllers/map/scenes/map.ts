import Phaser from 'phaser';
import tileset from '../assets/tileset_32px.png';
import characterImage from '../assets/character.png';
import characterData from '../assets/character.json';

export default class MainScene extends Phaser.Scene {
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

  private _lastMovement: number = Date.now();

  private _showDebug: boolean = false;

  private _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;

  private _lastPosition: { x: number, y: number } = { x: 0, y: 0 };

  private _canMove: boolean = true;

  private get cursors(): Phaser.Types.Input.Keyboard.CursorKeys | null {
    return this._cursors;
  }

  private set cursors(val: Phaser.Types.Input.Keyboard.CursorKeys | null) {
    this._cursors = val;
  }

  private get canMove(): boolean {
    return this._canMove;
  }

  private set canMove(val: boolean) {
    this._canMove = val;
  }

  private get lastPosition(): { x: number, y: number } {
    return this._lastPosition;
  }

  private set lastPosition(val: { x: number, y: number }) {
    this._lastPosition = val;
  }

  private get lastMovement(): number {
    return this._lastMovement;
  }

  private set lastMovement(val: number) {
    this._lastMovement = val;
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
    this.load.tilemapTiledJSON('map', JSON.parse(sessionStorage.getItem('mainMap') as string) as Record<string, unknown>);
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

    this.lastPosition = {
      x: this.player.x,
      y: this.player.y
    };

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
    if (!this.canMove) return;
    const speed = 175;
    const prevVelocity = this.player!.body.velocity.clone();

    // Move
    this.player!.body.setVelocity(0);

    if (this.cursors!.left.isDown) {
      if (!this.cursors!.down.isDown && !this.cursors!.up.isDown) this.move('x', false);
    } else if (this.cursors!.right.isDown) {
      if (!this.cursors!.down.isDown && !this.cursors!.up.isDown) this.move('x', true);
    }

    if (this.cursors!.up.isDown) {
      if (!this.cursors!.right.isDown && !this.cursors!.left.isDown) this.move('y', false);
    } else if (this.cursors!.down.isDown) {
      if (!this.cursors!.right.isDown && !this.cursors!.left.isDown) this.move('y', true);
    }

    // Update animation
    this.player!.body.velocity.normalize().scale(speed);

    // Make sure that user holds only 1 button at the time. This is used to make sure that user will move only 1 position up/down
    if (this.cursors!.left.isDown && !this.cursors!.up.isDown && !this.cursors!.down.isDown) {
      this.player!.anims.play('misa-left-walk', true);
    } else if (this.cursors!.right.isDown && !this.cursors!.up.isDown && !this.cursors!.down.isDown) {
      this.player!.anims.play('misa-right-walk', true);
    } else if (this.cursors!.up.isDown && !this.cursors!.left.isDown && !this.cursors!.right.isDown) {
      this.player!.anims.play('misa-back-walk', true);
    } else if (this.cursors!.down.isDown && !this.cursors!.left.isDown && !this.cursors!.right.isDown) {
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

  private move(param: 'x' | 'y', up: boolean): void {
    const speed = 20;

    if ((this.player!.x - this.lastPosition.x > 32) || this.lastPosition.x - this.player!.x > 32 || this.player!.y - this.lastPosition.y > 32 || this.lastPosition.y - this.player!.y > 32) {
      if (Date.now() - this.lastMovement > 2000) {
        this.lastPosition.x = this.player!.x;
        this.lastPosition.y = this.player!.y;
        this.lastMovement = Date.now();
      }
    } else {
      if (param === 'x') {
        this.player!.setVelocityX(up ? speed : -speed);
      } else {
        this.player!.setVelocityY(up ? speed : -speed);
      }
      this.lastMovement = Date.now();
    }
  }
}

