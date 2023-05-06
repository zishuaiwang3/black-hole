import Phaser from "phaser";

import background from "@/assets/images/bg.png";
import blackHole from "@/assets/images/OIG.png";
import tree from "@/assets/images/tile_0028.png";
import building from "@/assets/images/tile_0130.png";
import car from "@/assets/images/tile_0115.png";
import rock from "@/assets/images/tile_0007.png";
import trashCan from "@/assets/images/tile_0104.png";


export default class MainScene extends Phaser.Scene {
  constructor() {
    super("main-scenes");
  }



  preload() {
    // 预加载资源
    this.load.image("background", background);
    this.load.image("black-hole", blackHole);
    this.load.image("tree", tree);
    this.load.image("building", building);
    this.load.image("car", car);
    this.load.image("rock", rock);
    this.load.image("trash-can", trashCan);

  }

  create() {
    // 创建场景对象
    // 创建背景
    this.add.image(400, 300, "background");

    // 创建黑洞
    this.blackHole = this.physics.add.image(438, 438, "black-hole");
    this.blackHole.setCircle(this.blackHole.displayWidth * 0.5, this.blackHole.displayWidth * -0.5, this.blackHole.displayHeight * -0.5);



    this.blackHole.setScale(0.1);
    this.blackHole.setOrigin(0.5, 0.5);

    // 创建其他游戏对象，如树木、建筑物、汽车等，并将它们添加到一个组中
    this.objectsGroup = this.physics.add.group();

    // 随机放置游戏对象
    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(50, 550);
      const objType = Phaser.Math.Between(1, 5);
      let obj;

      switch (objType) {
        case 1:
          obj = this.physics.add.image(x, y, "tree");
          break;
        case 2:
          obj = this.physics.add.image(x, y, "building");
          break;
        case 3:
          obj = this.physics.add.image(x, y, "car");
          break;
        case 4:
          obj = this.physics.add.image(x, y, "rock");
          break;
        case 5:
          obj = this.physics.add.image(x, y, "trash-can");
          break;
      }

      this.objectsGroup.add(obj);
    }
    // 创建计时器
    this.startTime = Date.now();
    // 创建计分板
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "得分: 0", { fontSize: "32px", color: "#fff" });


    // 碰撞检测
    this.physics.add.overlap(
      this.blackHole,
      this.objectsGroup,
      this.absorbObject,
      null,
      this
    );
  }
  absorbObject(blackHole, obj) {
    // 判断黑洞是否足够大以吞噬对象
    if (this.canAbsorb(obj)) {
      // 从场景中移除对象
      obj.destroy();

      // 增加黑洞的大小
      const growthFactor = 0.001;
      const newScale = blackHole.scale + growthFactor;
      blackHole.setScale(newScale);
      // 更新计分板
      this.score += 10;
      this.scoreText.setText("得分: " + this.score);
    }
  }

  canAbsorb(obj) {
    // 根据对象的大小和黑洞的大小判断是否可以吞噬
    const blackHoleRadius = this.blackHole.displayWidth * this.blackHole.scaleX * 0.5;
    const objectDiagonal = Math.sqrt(Math.pow(obj.displayWidth, 2) + Math.pow(obj.displayHeight, 2)) * 0.5;

    const dx = this.blackHole.x - obj.x;
    const dy = this.blackHole.y - obj.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    console.log(blackHoleRadius, objectDiagonal, distance);
    return blackHoleRadius >= distance + objectDiagonal; // 如果黑洞半径大于或等于距离加上对象对角线的一半，则可以吞噬
  }
  update() {
    // 更新场景
    const speed = 100;
    const cursors = this.input.keyboard.createCursorKeys();

    // 根据用户输入移动黑洞
    if (cursors.left.isDown) {
      this.blackHole.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      this.blackHole.setVelocityX(speed);
    } else {
      this.blackHole.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      this.blackHole.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      this.blackHole.setVelocityY(speed);
    } else {
      this.blackHole.setVelocityY(0);
    }
    // 检查游戏是否结束
    if (this.objectsGroup.countActive() === 0) {
      this.gameOver();
    }
  }
  gameOver() {
    // 计算所用时间（秒）
    const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
    // 显示游戏结束提示
    const gameOverText = this.add.text(400, 300, "游戏结束", {
      fontSize: "32px",
      color: "#fff",
    });
    gameOverText.setOrigin(0.5, 0.5);

    // 停止黑洞的移动
    this.blackHole.setVelocity(0, 0);
    this.physics.pause();

    // 添加重新开始游戏的逻辑（可选）
    // 跳转到游戏结束场景
    this.scene.start("game-over-scene", { elapsedTime: elapsedTime, score: this.score });
  }
}
