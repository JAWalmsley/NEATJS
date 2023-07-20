"use strict";
const GRAVITY = -0.5;
const JUMP_VELOCITY = 10;
class Bird {
    constructor(canvas) {
        this.x = 100;
        this.y = canvas.height / 2;
        this.r = 20;
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
        this.velocity += GRAVITY;
        if (this.y >= this.canvas.height) {
            console.log("END");
            this.die();
        }
    }
    die() {
        this.dead = true;
    }
    jump() {
        this.velocity = JUMP_VELOCITY;
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        if (ctx == null) {
            console.error('Could not get context');
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}
