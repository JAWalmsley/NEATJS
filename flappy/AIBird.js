"use strict";
class AIBird extends Bird {
    agent;
    constructor(canvas, agent) {
        super(canvas);
        this.agent = agent;
    }
    makeAIMove(pipes) {
        let nextPipe = this.getNextPipe(pipes);
        let pipeDistScaled = (nextPipe.x - this.x) / this.canvas.width;
        let pipeHeightScaled = nextPipe.gapHeight / this.canvas.height;
        let yScaled = this.y / this.canvas.height;
        let velScaled = this.velocity / 10;
        let output = this.agent.brain.getOutput([pipeDistScaled, pipeHeightScaled, yScaled, velScaled, 1]);
        // Two outputs: Jump, Don't Jump
        // Having one for each case is better for training according to the paper
        if (output[0] > output[1]) {
            this.jump();
        }
    }
    update() {
        super.update();
        this.score += 1;
    }
    die() {
        super.die();
        this.agent.fitness = this.score;
    }
    getNextPipe(pipes) {
        let nextPipe = pipes[0];
        for (let p of pipes) {
            if (p.x < this.x - 20) {
                continue;
            }
            if (p.x - this.x < nextPipe.x - this.x) {
                nextPipe = p;
            }
        }
        return nextPipe;
    }
}
