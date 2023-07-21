const PIPE_SPACING: number = 500;
namespace Flappy {
    let canvas: HTMLCanvasElement = document.getElementById(
        'game'
    ) as HTMLCanvasElement;

   

    let birds: Array<Bird> = [];
    let pipes: Array<Pipe> = [];
    let NEATManager = new NEAT(
        500,
        5,
        2,
        ['PipeDist', 'PipeHeight', 'BirdY', 'BirdVel', 'Bias'],
        ['Jump', 'DontJump']
    );
    NEATManager.createPopulation();

    let neuralCanv = document.getElementById('neural') as HTMLCanvasElement;

    let draw = new Drawer(
        neuralCanv.getContext('2d') as CanvasRenderingContext2D
    );

    let generation = 0;

    function reset() {
        birds = [];
        pipes = [];

        for (let agent of NEATManager.agents) {
            birds.push(new AIBird(canvas, agent));
        }

        pipes.push(new Pipe(canvas, canvas.width));
    }

    function run() {
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updatePipes();
        updateBirds();
        aliveHTML.innerHTML = birds.length.toString();
        if (birds.length == 0) {
            generation++;
            genHTML.innerHTML = generation.toString();
            speciesHTML.innerHTML = NEATManager.species.length.toString();

            NEATManager.nextGeneration();
            reset();
        }
        if (birds[0] instanceof AIBird) {
            draw.drawNN(birds[0].agent.brain);
        }
        scoreHTML.innerHTML = birds[0].score.toString();
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
        let maxPipeX: number = 0;
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
            }
        }
        // Add new pipes if the last one is far enough away
        if (maxPipeX < PIPE_SPACING) {
            pipes.push(new Pipe(canvas));
        }
    }

    function setTimescale(tsc: number) {
        clearInterval(int);
        int = setInterval(run, 1000 / tsc);
    }

    canvas.addEventListener('click', () => {
        birds[0].jump();
    });

    let slowButton = document.getElementById('slowdown') as HTMLButtonElement;
    let fastButton = document.getElementById('speedup') as HTMLButtonElement;

    slowButton.addEventListener('click', () => {
        setTimescale(60);
    });

    fastButton.addEventListener('click', () => {
        setTimescale(1000);
    });

    reset();
    var int = setInterval(run, 1000 / 1000);
}
