import Canvas from "./canvas";
import Ball from "./ball";
import Player from "./player";
import Human from "./human";
import Computer from "./computer";
import Keyboard from "./keyboard";
import Background from "./background";
import { StaticLabel, DynamicLabel } from "./label";
import Hud from "./hud";

export default class Game extends Canvas {
  constructor() {
    super("game_canvas", null, "white", 3);

    this.currentState = Game.state.init;
    this.blocksize = 10;

    this.background = new Background(this);
    this.hud = new Hud(this);
    this.keyboard = new Keyboard(this);
    this.player1 = new Human(this, 1);
    this.player2 = new Computer(this, 2);
    this.ball = new Ball(this);

    this.createDelay(500).then(() => {
      this.createAdvancedGameLoop();
    });
  }

  createAdvancedGameLoop() {
    this.step = 1 / 120;
    this.accumulator = 0;

    let lastTime;
    const callback = (millis) => {
      if (lastTime) {
        const deltatime = (millis - lastTime) / 1000;

        switch (this.currentState) {
          case Game.state.init:
            console.log("init");

            this.background.draw();

            this.player1.paddle.reset();
            this.player1.update(deltatime);
            this.player1.draw();

            this.player2.paddle.reset();
            this.player2.update(deltatime);
            this.player2.draw();

            this.ball.reset();

            this.label = new DynamicLabel(
              this,
              "press spacebar to start",
              this.canvas.width / 2,
              this.canvas.height / 2,
              "grey",
              "center"
            );
            this.currentState = Game.state.intro;

            break;
          case Game.state.intro:
            console.log("intro");
            this.label.update();
            this.label.draw();

            if (this.keyboard.isKeyDown(this.keyboard.spacebar)) {
              this.label.clear();
              this.label = null;
              this.currentState = Game.state.play;
            }

            break;
          case Game.state.play:
            console.log("play");
            this.player1.checkInput();
            this.player2.checkInput();
            this.update(deltatime);
            this.draw();
            break;
        }
      }
      lastTime = millis;
      requestAnimationFrame(callback);
    };
    callback();
  }

  createDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  collide(ball, paddle, deltatime) {
    return ball.right + ball.velocity.x * deltatime >=
      paddle.left + paddle.velocity.x * deltatime &&
      ball.left + ball.velocity.x * deltatime <=
        paddle.right + paddle.velocity.x * deltatime &&
      ball.bottom + ball.velocity.y * deltatime >=
        paddle.top + paddle.velocity.y * deltatime &&
      ball.top + ball.velocity.y * deltatime <=
        paddle.bottom + paddle.velocity.y * deltatime
      ? true
      : false;
  }

  checkcollision(deltatime) {
    if (
      this.ball.top + this.ball.velocity.y * deltatime < this.blocksize ||
      this.ball.bottom + this.ball.velocity.y * deltatime >
        this.canvas.height - this.blocksize
    ) {
      this.ball.velocity.y *= -1;
    }

    this.paddle =
      this.ball.position.x < this.canvas.width / 2
        ? this.player1.paddle
        : this.player2.paddle;

    if (this.collide(this.ball, this.paddle, deltatime)) {
      if (
        this.ball.bottom > this.paddle.top &&
        this.ball.top < this.paddle.bottom
      ) {
        this.ball.position.x =
          this.paddle.index === 1
            ? this.paddle.right + this.ball.size.x / 2
            : this.paddle.left - this.ball.size / 2;
        this.ball.velocity.x *= -1;
      } else if (this.ball.position.y < this.paddle.position.y) {
        this.ball.position.y = this.paddle.top - this.ball.size.y / 2;
        this.ball.velocity.y *= -1;
        this.ball.velocity.y =
          this.paddle.velocity < 0 &&
          this.paddle.velocity.y < this.ball.velocity.y
            ? this.paddle.velocity.y * 1.1
            : this.ball.velocity.y;
      } else if (this.ball.position.y > this.paddle.position.y) {
        this.ball.position.y = this.paddle.bottom + this.ball.size.y / 2;
        this.ball.velocity.y *= -1;
        this.ball.velocity.y =
          this.paddle.velocity.y > 0 &&
          this.paddle.velocity.y > this.ball.velocity.y
            ? this.paddle.velocity.y * 1.1
            : this.ball.velocity.y;
      }
    }

    if (this.ball.left > this.canvas.width || this.ball.right < 0) {
      if (this.ball.left > this.canvas.width) {
        // console.log('bal verlaat het veldt rechts');
      }
      if (this.ball.right < 0) {
        // console.log('bal verlaat veld links');
      }
    }
  }

  simulate(deltatime) {
    this.player1.update(deltatime);
    this.player2.update(deltatime);
    this.ball.update(deltatime);

    this.checkcollision(deltatime);
  }

  update(deltatime) {
    this.accumulator += deltatime;
    while (this.accumulator > this.step) {
      this.simulate(this.step);
      this.accumulator -= this.step;
    }
  }

  draw() {
    this.clear();
    this.player1.draw();
    this.player2.draw();
    this.ball.draw();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  toDegrees(rad) {
    return (rad * 180) / Math.PI;
  }

  getRandNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

Game.state = { init: 0, intro: 1, play: 2 };
