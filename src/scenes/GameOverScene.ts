import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over-scene");
  }

  create(data: { elapsedTime: string; }) {
    // 显示游戏结束文字
    const gameOverText = this.add.text(400, 150, "游戏结束", { fontSize: "48px", color: "#fff" });
    gameOverText.setOrigin(0.5);

    // 显示所用时间和得分
    const elapsedTimeText = this.add.text(400, 250, "用时: " + data.elapsedTime + " 秒", { fontSize: "24px", color: "#fff" });
    elapsedTimeText.setOrigin(0.5);
    const scoreText = this.add.text(400, 300, "得分: " + data.score, { fontSize: "24px", color: "#fff" });
    scoreText.setOrigin(0.5);
    // 点击屏幕重新开始游戏
    this.input.on("pointerdown", () => {
      this.scene.start("main-scenes");
    });
  }
}
