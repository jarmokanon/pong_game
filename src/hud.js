import Canvas from "./canvas";

export default class Hud extends Canvas {
  constructor(game) {
    super("hud_canvas", null, "white", 3);

    this.game = game;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.clear();
    this.game.testLabel.update();
    this.game.testLabel.draw();
  }
}
