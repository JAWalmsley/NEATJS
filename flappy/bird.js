"use strict";
class Bird {
    constructor(canvas) {
        this.y = canvas.height / 2;
        this.velocity = 0;
        this.canvas = canvas;
        this.dead = false;
    }
    update() {
        this.draw();
        if (this.dead) {
            return;
        }
        this.y -= this.velocity;
        this.velocity -= 0.4;
        if (this.y >= this.canvas.height) {
            console.log("END");
            this.dead = true;
        }
    }
    jump() {
        this.velocity = 10;
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        if (ctx == null) {
            console.error('Could not get context');
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(100, this.y, 20, 0, 2 * Math.PI);
        ctx.fill();
    }
}
