const GRAVITY = -0.5;
const JUMP_VELOCITY = 10;

class Bird {
    x: number;
    y: number;
    r: number;
    score: number;
    velocity: number;
    canvas: HTMLCanvasElement;
    dead: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.x = 100;
        this.y = canvas.height / 2;
        this.r = 20;
        this.score = 0;
        this.velocity = 0;
        this.canvas = canvas;
        this.dead = false;
    }

    update() {
        this.draw();
        if(this.dead) {
            return;
        }
        this.y -= this.velocity;
        this.velocity += GRAVITY;
        if(this.y >= this.canvas.height) {
            this.die();
        }
    }

    die() {
        this.dead = true;
    }

    jump() {
        this.velocity = JUMP_VELOCITY;
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        if(ctx == null) {
            console.error('Could not get context');
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    isTouching(p: Pipe) {
        let hitRadius = this.r * FUN_MARGIN;
        if(this.y - hitRadius < p.gapHeight || this.y + hitRadius > p.gapHeight + GAP_SIZE) {
            if(this.x + hitRadius > p.x && this.x - hitRadius < p.x + PIPE_WIDTH) {
                return true;
            }
        }
    }
}