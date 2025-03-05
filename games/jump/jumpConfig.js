
import jumpGame from './Scenes/game.js';
import Preloader from './Scenes/preloader.js';
import opening from './Scenes/opening.js';
import playAgain from './Scenes/playagain.js';

const jumpConfig = {
    type: Phaser.AUTO,
    width: 720, // Fixed width for 9:16 aspect ratio
    height: 1280, // Fixed height for 9:16 aspect ratio
    parent: 'phaserGames',
    backgroundColor: 'navy',
    render: {
      pixelArt: true,
      canvas: {
          willReadFrequently: true // 🚀 This optimizes rendering speed
      }},
    // parent: 'gameCanvas',
    physics: {
        default: "arcade",
        arcade:{
            gravity: {y: 200},
            debug: true
            }
      },
      scene: [Preloader, opening, jumpGame, playAgain],
      scale: {
        mode: Phaser.Scale.FIT, // ✅ Ensures the game resizes to fit screen
        autoCenter: Phaser.Scale.CENTER_BOTH, // ✅ Centers the game on the screen
      },
  };

export default new Phaser.Game(jumpConfig);

