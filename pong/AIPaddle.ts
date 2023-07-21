class AIPaddle extends Paddle {
    agent: Agent;
    constructor(canvas: HTMLCanvasElement, agent: Agent) {
        super(canvas);
        this.agent = agent;
    }

    makeAIMove(ball: Ball) {
        let ballX = ball.x/this.canvas.width;
        let ballY = ball.y/this.canvas.height;
        let ballVelX = ball.velX/10;
        let ballVelY = ball.velY/10;
        let paddleY = this.y/this.canvas.height;
        let output = this.agent.brain.getOutput([ballX, ballY, ballVelX, ballVelY, paddleY, 1])
        // Three outputs: Up, Down, Nothing
        if(output[0] > output[1]) {
            this.y-=5;
        }
        if(output[1] > output[0]) {
            this.y+=5;
        }
    }

    die() {
        super.die();
        this.agent.fitness = this.score;
    }
}