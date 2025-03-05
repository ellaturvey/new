
import Opening from './Scenes/openscene.js';
import theGame from './Scenes/thegame.js';
import preloadScene from './Scenes/preloader.js'
import gameOver from './Scenes/gameover.js';
//https://www.udemy.com/course/game-development-in-js-the-complete-guide-w-phaser-3/learn/lecture/23070250#questions
//const Scenes = [preloadScene, Opening, theGame, gameOver];

//const initScenes = () => Scenes.map((Scene) => new Scene());
  const chasingConfig = {
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
      scene: [preloadScene, Opening, theGame, gameOver],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCentre: Phaser.Scale.CENTER_BOTH,
      },
  };


  export default new Phaser.Game(chasingConfig);
  