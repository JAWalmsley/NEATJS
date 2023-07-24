"use strict";
class Ball {
    RADIUS = 10;
    x;
    y;
    velX;
    velY;
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2 + 0;
        this.velX = 5;
        this.velY = 1;
    }
    update(paddle) {
        this.y += this.velY;
        this.x += this.velX;
        this.draw();
        if (this.isTouching(paddle)) {
            this.velX *= -1;
            let yDiff = this.y - paddle.y;
            yDiff /= paddle.height / 2;
            this.velY = yDiff * 2;
            paddle.score++;
        }
        if (this.x < 0) {
            paddle.die();
        }
        if (this.x > this.canvas.width) {
            this.velX *= -1;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.velY *= -1;
        }
    }
    draw() {
        let ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.RADIUS, 0, 2 * Math.PI);
        ctx.fill();
    }
    isTouching(paddle) {
        if (this.x + this.RADIUS > paddle.x &&
            this.x - this.RADIUS < paddle.x + paddle.width) {
            if (this.y + this.RADIUS > paddle.y - paddle.height / 2 &&
                this.y - this.RADIUS < paddle.y + paddle.height / 2) {
                return true;
            }
        }
    }
}
