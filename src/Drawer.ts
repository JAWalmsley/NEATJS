const SQ = 20;
const SCALE = 2;
/**
 * Functions to draw a neural network on a canvas
 */
class Drawer {
    ctx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.ctx.font = "11px sans-serif";
        this.ctx.textBaseline = "middle";
    }

    static RainbowColor(length: number, maxLength: number) {
        var i = Math.abs(length * 255 / maxLength);
        var r = length < 0 ? i : 0;
        var g = length >= 0 ? i : 0;
        var b = 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    drawSquare(x: number, y: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
        this.ctx.strokeStyle = "BLACK";
        this.ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
    }

    drawNN(nn: NeuralNetwork) {
        const START_OFFSET_X = 150;
        const START_OFFSET_Y = 10;
        const COLUMN_GAP = 50*SCALE;
        const ROW_GAP = 20*SCALE;

        const MIN_WEIGHT_DRAW = 0;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let layerHeights: {[layer: number]: number}  = {};
        let nodePositions: { [nodeid: number]: {x: number; y: number} }= {};
        let nodes: Array<NeuralNode> = nn.nodes.slice().sort((a: NeuralNode, b: NeuralNode) => a.id - b.id);
        let outputX = 0;
        for (let i = 0; i < nodes.length; i++) {
            let size = 5;
            let node: NeuralNode = nodes[i];
            if(node.isOutput) {
                size = 10;
            }
            this.ctx.beginPath();
            if (layerHeights[node.layer]) {
                layerHeights[node.layer]++;
            } else {
                layerHeights[node.layer] = 1;
            }
            let xoff = node.layer*0.5;
            // if (node.layer > 0 && !node.isOutput) {
            //     xoff = 1;
            //     layerHeights[node.layer]-=1;
            // }
            // if (node.isOutput) {
            //     xoff = 2;
            // }
            let x = START_OFFSET_X + COLUMN_GAP * xoff;
            let y = ROW_GAP * layerHeights[node.layer] + START_OFFSET_Y;
            if(node.isOutput) {
                outputX = x;
            }
            nodePositions[node.id] = { x: x, y: y };
            this.ctx.arc(x*SCALE, y*SCALE, size*SCALE, 0, 2 * Math.PI);
            this.ctx.fillStyle = Drawer.RainbowColor(node.outputValue, 1);
            this.ctx.fill();
            this.ctx.fillStyle = "black";
        }

        for (let i = 0; i < nn.connections.length; i++) {
            let conn = nn.connections[i];
            if (Math.abs(conn.weight) < MIN_WEIGHT_DRAW)
                continue;
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = Drawer.RainbowColor(conn.weight, 1);
            this.ctx.moveTo(nodePositions[conn.fromNode.id].x*SCALE, nodePositions[conn.fromNode.id].y*SCALE);
            this.ctx.lineTo(nodePositions[conn.toNode.id].x*SCALE, nodePositions[conn.toNode.id].y*SCALE);
            this.ctx.stroke();
        }

        for (let i = 0; i < nn.inputLabels.length; i++) {
            this.ctx.textAlign = "right";
            this.ctx.font = "bold 50px sans-serif";
            this.ctx.fillText(nn.inputLabels[i], (START_OFFSET_X - 10) * SCALE, (ROW_GAP * (i + 1) + START_OFFSET_Y)*SCALE);
        }

        for (let i = 0; i < nn.outputLabels.length; i++) {
            this.ctx.textAlign = "left";
            this.ctx.font = "bold 50px sans-serif";
            this.ctx.fillText(nn.outputLabels[i], (outputX + 10) * SCALE, (ROW_GAP * (i + 1) + START_OFFSET_Y)*SCALE);
        }
    }

    drawGrid(data: Array<number>, dim: number, smallData=[], smallDim=0) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let row = 0;
        let col = 0;
       
        
        let sizeDiff = (dim-1)/(smallDim-1)
        for (let item of smallData) {
            this.ctx.beginPath();
            this.ctx.arc(20 + row * (40*sizeDiff), 20 + col * (40*sizeDiff), 2, 0, 2 * Math.PI);
            this.ctx.fillStyle = Drawer.RainbowColor(item?1:0, 1);
            this.ctx.fill();
            if (row == smallDim - 1) {
                row = 0;
                col++;
            }
            else {
                row++;
            }
        }
        row = 0;
        col = 0;
        for (let item of data) {
            this.ctx.beginPath();
            this.ctx.arc(20 + row * 40, 20 + col * 40, 15, 0, 2 * Math.PI);
            this.ctx.fillStyle = Drawer.RainbowColor(item, 1);
            this.ctx.fill();
            if (row == dim - 1) {
                row = 0;
                col++;
            }
            else {
                row++;

            }
        }
    }
}