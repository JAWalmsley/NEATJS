"use strict";
const PIPE_SPACING = 500;
let canvas = document.getElementById('game');
let birds = [];
let pipes = [];
let NEATManager = new NEAT(100, 4, 2, ["PipeDist", "PipeHeight", "BirdY", "BirdVel"], ["Jump", "DontJump"]);
NEATManager.createPopulation();
function reset() {
    birds = [];
    pipes = [];
    for (let agent of NEATManager.agents) {
        birds.push(new AIBird(canvas, agent));
    }
    pipes.push(new Pipe(canvas, canvas.width));
}
function run() {
    let ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePipes();
    updateBirds();
    if (birds.length == 0) {
        NEATManager.nextGeneration();
        reset();
    }
}
function updateBirds() {
    for (let b of birds) {
        b.update();
        for (let p of pipes) {
            if (b.isTouching(p)) {
                b.die();
            }
        }
        if (b instanceof AIBird) {
            b.makeAIMove(pipes);
        }
        if (b.dead) {
            birds.splice(birds.indexOf(b), 1);
        }
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
