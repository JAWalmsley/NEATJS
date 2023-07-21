"use strict";
// Gap between top and bottom pipe
const GAP_SIZE = 250;
// Minimum space between gap and top/bottom of the screen
const GAP_BORDER = 200;
// Width of the pipe
const PIPE_WIDTH = 50;
// How much smaller the hitbox is than the actual player's radius (makes it feel more forgiving)
const FUN_MARGIN = 0.7;
class Pipe {
    x;
    passed;
    canvas;
    gapHeight;
    constructor(canvas, x = null) {
        this.x = x ?? canvas.width;
        this.passed = false;
        this.canvas = canvas;
        let gapRange = canvas.height - GAP_SIZE - GAP_BORDER * 2;
        this.gapHeight = Math.random() * gapRange + GAP_BORDER;
    }
    update() {
        this.x -= 2;
        this.draw();
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        if (ctx == null) {
            console.error('Could not get context');
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.rect(this.x, 0, PIPE_WIDTH, this.gapHeight);
        ctx.rect(this.x, this.gapHeight + GAP_SIZE, PIPE_WIDTH, 1000);
        ctx.fill();
    }
}
