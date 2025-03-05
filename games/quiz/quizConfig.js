
import quizGame from './Scenes/game.js';
import Preloader from './Scenes/preloader.js';
import opening from './Scenes/opening.js';
import playAgain from './Scenes/playagain.js';

const quizConfig = {
    type: Phaser.AUTO,
    width: 720, 
    height: 1280, 
    parent: 'phaserGames',
    backgroundColor: 0x143F8F,
    render: {
      pixelArt: true,
      canvas: {
          willReadFrequently: true 
      }},
    // parent: 'gameCanvas',
    physics: {
        default: "arcade",
        arcade:{
            gravity: {y: 200},
            debug: true
            }
      },
      scene: [Preloader, opening, quizGame, playAgain],
      scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH, 
      },
  };

export default new Phaser.Game(quizConfig);

