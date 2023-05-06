import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start-scene");
  }

  create() {
    // 显示游戏标题
    const title = this.add.text(400, 200, "黑洞吞噬", { fontSize: "48px", color: "#fff" });
    title.setOrigin(0.5);

    // 显示游戏说明
    const instructions = this.add.text(400, 300, "点击屏幕开始游戏", { fontSize: "24px", color: "#fff" });
    instructions.setOrigin(0.5);

    // 点击屏幕开始游戏
    this.input.on("pointerdown", () => {
      this.scene.start("main-scenes");
    });
  }
}
