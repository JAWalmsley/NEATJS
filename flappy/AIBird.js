"use strict";
class AIBird extends Bird {
    constructor(canvas) {
        super(canvas);
        this.NN = new NeuralNetwork(4, 6, 1);
    }
    update() {
        super.update();
        this.jump();
    }
    makeAIMove() {
    }
}
