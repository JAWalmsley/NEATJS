namespace Pong {
    let canvas: HTMLCanvasElement = document.getElementById(
        'game'
    ) as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

    let genHTML = document.getElementById('gen') as HTMLSpanElement;
    let scoreHTML = document.getElementById('score') as HTMLSpanElement;
    let aliveHTML = document.getElementById('alive') as HTMLSpanElement;
    let speciesHTML = document.getElementById('species') as HTMLSpanElement;

    let NEATManager = new NEAT(100, 6, 3, ["BallX", "BallY", "BallVelX", "BallVelY", "PaddleY", "Bias"], ["Up", "Down", "Nothing"]);
    NEATManager.createPopulation();

    let neuralCanv = document.getElementById("neural") as HTMLCanvasElement;
    let draw = new Drawer(neuralCanv.getContext('2d') as CanvasRenderingContext2D);
    let generation = 0;

    let players: {paddle: Paddle; ball: Ball}[] = [];
    
    function reset() {
        players = [];
        for(let agent of NEATManager.agents) {
            players.push({paddle: new AIPaddle(canvas, agent), ball: new Ball(canvas)});
        }
    }

    function run() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        updatePlayers();
        aliveHTML.innerHTML = players.length.toString();
        if(players.length == 0) {
            generation++;
            genHTML.innerHTML = generation.toString();
            speciesHTML.innerHTML = NEATManager.species.length.toString();

            NEATManager.nextGeneration();
            reset();
        }
        if (players[0].paddle instanceof AIPaddle) {
            draw.drawNN(players[0].paddle.agent.brain);
        }
        scoreHTML.innerHTML = players[0].paddle.score.toString();
    }

    function updatePlayers() {
        for(let p of players) {
            p.paddle.update();
            p.ball.update(p.paddle);
            if(p.paddle instanceof AIPaddle) {
                p.paddle.makeAIMove(p.ball);
            }
        }
        players = players.filter((p) => !p.paddle.dead)
    }

    reset();
    setInterval(run, 1000/60);
}


