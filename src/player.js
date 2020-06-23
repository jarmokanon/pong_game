import Paddle from "./paddle";

export default class Player {
  constructor(game, index) {
    this.game = game;
    this.index = index;
    this.paddle = new Paddle(game, index);
  }

  update(deltatime) {
    this.paddle.update(deltatime);
  }

  draw() {
    this.paddle.draw();
  }
}
