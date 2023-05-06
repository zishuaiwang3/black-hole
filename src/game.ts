import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import StartScene from "./scenes/StartScene";
import GameOverScene from "./scenes/GameOverScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [StartScene, MainScene,GameOverScene ],
};

const game = new Phaser.Game(config);

export default game;
