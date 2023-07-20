const ACTIVATION_SLOPE = 3;
class NeuralNode {
    layer: number;
    isOutput: boolean;
    id: number;
    outboundConnections: Array<Connection>;
    inputValues: Array<number>;
    outputValue: number;

    /**
     * 
     * @param {*} innovation 
     * @param {*} layer 
     * @param {*} isOutput 
     * @param {*} bias 
     */
    constructor(layer: number, isOutput: boolean, id: number) {
        // Layer 0: input, hidden after
        this.layer = layer;
        this.isOutput = isOutput;
        this.id = id;

        this.outboundConnections = [];
        this.inputValues = [];
        this.outputValue = 0;
    }

    static isConnected(node1: NeuralNode, node2: NeuralNode) {
        if(node1.outputsTo(node2) || node2.outputsTo(node1)) {
            return true;
        }
        return false;
    }

    addInput(val: number) {
        this.inputValues.push(val);
        if(this.layer == 0 && this.inputValues.length > 1) {
            console.error("Input node has more than one input value");
        }
    }

    calculateOutputAndSendFoward() {
        if(this.layer == 0) {
            // Input layer has one input and no activation function
            this.outputValue = this.inputValues[0]
        } else {
            this.outputValue = Math.tanh(ACTIVATION_SLOPE * sumArr(this.inputValues));
        }
        for(let conn of this.outboundConnections) {
            conn.toNode.addInput(this.outputValue * conn.weight);
        }
    }

    copy() {
        return new NeuralNode(this.layer, this.isOutput, this.id);
    }

    outputsTo(node: NeuralNode) {
        if(this.layer == node.layer) {
            return false;
        }
        if(this.layer > node.layer) {
            return false;
        }
        for(let conn of this.outboundConnections) {
            if(conn.toNode == node) {
                return true;
            }
        }
    }
}