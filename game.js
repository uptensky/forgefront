// Forgefront Game - Real Demo Entry Point (Phaser 3)
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1a1a1a',
  scene: [IntroScene, TavernScene],
};

const game = new Phaser.Game(config);

class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  preload() {
    this.load.image('bg_workshop', 'assets/img/bg_workshop.png');
    this.load.image('npc_barborka', 'assets/img/npc_barborka.png');
    this.load.audio('click', 'assets/audio/click.mp3');
  }

  create() {
    this.add.image(400, 300, 'bg_workshop');
    this.add.image(180, 400, 'npc_barborka').setScale(1);

    this.dialogIndex = 0;
    this.dialogs = [
      'Vítej zpět... Tohle je Forgefront.',
      'Jsem Barborka Pravoruká. Mentorka, kladivem i slovem.',
      'Kováři jako ty tvoří legendy. Chceš začít?'
    ];

    this.dialogBox = this.add.rectangle(400, 520, 720, 100, 0x222244);
    this.dialogText = this.add.text(100, 490, this.dialogs[0], {
      fontSize: '18px', fill: '#ffffff', wordWrap: { width: 600 }
    });

    this.input.once('pointerdown', () => this.nextDialog());
  }

  nextDialog() {
    this.sound.play('click');
    this.dialogIndex++;
    if (this.dialogIndex < this.dialogs.length) {
      this.dialogText.setText(this.dialogs[this.dialogIndex]);
      this.input.once('pointerdown', () => this.nextDialog());
    } else {
      const startBtn = this.add.text(300, 560, '▶ Vstoupit do Replay\'s', {
        fontSize: '22px', fill: '#00ff88', backgroundColor: '#111', padding: 10
      }).setInteractive();
      startBtn.on('pointerdown', () => this.scene.start('TavernScene'));
    }
  }
}

class TavernScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TavernScene' });
  }

  preload() {
    this.load.image('bg_replays', 'assets/img/bg_replays.png');
  }

  create() {
    this.add.image(400, 300, 'bg_replays');
    this.add.text(200, 280, 'Replay\'s Tavern - Nejlepší pizza na ohni a steaky ve městě!', {
      fontSize: '20px', fill: '#fff'
    });
    this.add.text(300, 520, '⬅ Zpět do dílny', {
      fontSize: '18px', fill: '#00ccaa', backgroundColor: '#000'
    }).setInteractive().on('pointerdown', () => this.scene.start('IntroScene'));
  }
}
