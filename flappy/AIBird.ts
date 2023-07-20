class AIBird extends Bird {
    brain;
    constructor(canvas: HTMLCanvasElement) {
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