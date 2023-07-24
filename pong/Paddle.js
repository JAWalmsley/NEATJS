"use strict";
class Paddle {
    height = 100;
    width = 10;
    score = 0;
    x;
    y;
    dead = false;
    canvas;
    constructor(canvas) {
        this.x = 0;
        this.y = canvas.height / 2;
        this.canvas = canvas;
    }
    update() {
        this.draw();
    }
    die() {
        this.dead = true;
    }
    draw() {
        let ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.rect(this.x, this.y - this.height / 2, this.width, this.height);
        ctx.fill();
        // ctx.stroke();
    }
}
