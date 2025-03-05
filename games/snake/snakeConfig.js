
import chargeGame from './Scenes/game.js';
import Preloader from './Scenes/preloader.js';
import opening from './Scenes/opening.js';
import playAgain from './Scenes/playagain.js';

const snakeConfig = {
    type: Phaser.AUTO,
    width: 720, //9:16 ratio - tiktok video size
    height: 1280, // 
    parent: 'phaserGames',
    backgroundColor: 0x0028FF,
    render: {
      pixelArt: true,
      canvas: {
          willReadFrequently: true // optimise rendering speed
      }},

    // parent: 'gameCanvas',
    physics: {
        default: "arcade",
        arcade:{
            gravity: {y: 0, x:0},
            debug: true
            }
      },
      scene: [Preloader, opening, chargeGame, playAgain],
      scale: {
        mode: Phaser.Scale.FIT, // ensures the game resizes to fit screen
        autoCenter: Phaser.Scale.CENTER_BOTH, // centers the game on the screen
      },
  };

export default new Phaser.Game(snakeConfig);