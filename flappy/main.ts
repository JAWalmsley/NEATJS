let canvas: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;

let bird = new Bird(canvas);
bird.update();

function run() {
    let ctx = canvas.getContext('2d');
    if(ctx == null) {
        console.error('Could not get context');
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bird.update();
}

setInterval(run, 1000/60);

