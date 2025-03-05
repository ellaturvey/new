
import breakoutGame from './Scenes/game.js';
import Preloader from './Scenes/preloader.js';
import opening from './Scenes/opening.js';

const breakoutConfig = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280, 
    parent: 'phaserGames',
    backgroundColor: 'navy',
    render: {
      pixelArt: true,
      canvas: {
          willReadFrequently: true 
      }},
    // parent: 'gameCanvas',
    physics: {
        default: "arcade",
        arcade:{
            gravity: 0,
            debug: true
            }
      },
      scene: [Preloader, opening, breakoutGame],
      scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH, 
      },
  };

export default new Phaser.Game(breakoutConfig);