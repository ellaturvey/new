import breakoutConfig from './games/breakout/breakoutConfig.js';

class GameManager {
    constructor() {
        this.games = [
            // Add your game configurations here
            { name: 'Breakout', config: breakoutConfig }, // Example game config
            // Add more games as needed
        ];
    }

    loadGame(index) {
        if (this.games[index]) {
            const gameConfig = this.games[index].config;
            new Phaser.Game(gameConfig); // Initialize the Phaser game with the config
        } else {
            console.error('Game not found:', index);
        }
    }
}

// Initialize the gameManager
const gameManager = new GameManager();
window.gameManager = gameManager; // Expose to global scope
