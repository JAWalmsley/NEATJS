"use strict";
const PIPE_SPACING = 500;
let canvas = document.getElementById('game');
let birds = [];
let pipes = [];
function reset() {
    birds.push(new Bird(canvas), new AIBird(canvas));
    pipes = [];
    pipes.push(new Pipe(canvas, canvas.width));
}
function run() {
    let ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBirds();
    updatePipes();
}
function updateBirds() {
    for (let b of birds) {
        b.update();
        for (let p of pipes) {
            if (b.isTouching(p)) {
                b.die();
                birds.splice(birds.indexOf(b), 1);
            }
        }
    }
    if (birds.length == 0) {
        reset();
    }
}
function scoreUp() {
    for (let b of birds) {
        b.score++;
    }
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
        if (!p.passed && p.x < birds[0].x) {
            p.passed = true;
            scoreUp();
            console.log(birds[0].score);
        }
    }
    // Add new pipes if the last one is far enough away
    if (maxPipeX < PIPE_SPACING) {
        pipes.push(new Pipe(canvas));
    }
}
canvas.addEventListener('click', () => {
    birds[0].jump();
});
reset();
setInterval(run, 1000 / 60);
