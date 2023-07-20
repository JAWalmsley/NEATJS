"use strict";
class AIBird extends Bird {
    constructor(canvas) {
        super(canvas);
        this.brain = new NeuralNetwork(4, 2);
    }
    update() {
        super.update();
        this.jump();
    }
    makeAIMove() {
    }
}
