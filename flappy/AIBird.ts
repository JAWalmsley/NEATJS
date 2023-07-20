class AIBird extends Bird {
    brain: NeuralNetwork;
    constructor(canvas: HTMLCanvasElement) {
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