"use strict";
const PIPE_SPACING = 500;
let canvas = document.getElementById('game');
let bird = new Bird(canvas);
let pipes = [];
function reset() {
    bird = new Bird(canvas);
    pipes = [];
    pipes.push(new Pipe(canvas, canvas.width));
}
function run() {
    let ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    updatePipes();
}
function updatePipes() {
    let maxPipeX = 0;
    for (let p of pipes) {
        // Find max pipe x
        if (p.x > maxPipeX) {
            maxPipeX = p.x;
        }
        // Update all pipes and delete offscreen pipes
        p.update();
        if (p.x < -100) {
            pipes.splice(pipes.indexOf(p), 1);
        }
        if (p.isTouching(bird)) {
            console.log("Bird Died!");
            reset();
        }
    }
    // Add new pipes if the last one is far enough away
    if (maxPipeX < PIPE_SPACING) {
        pipes.push(new Pipe(canvas));
    }
}
reset();
setInterval(run, 1000 / 60);
