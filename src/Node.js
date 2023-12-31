"use strict";
const ACTIVATION_SLOPE = 3;
class NeuralNode {
    layer;
    isOutput;
    id;
    outboundConnections;
    inputValues;
    outputValue;
    /**
     *
     * @param {*} innovation
     * @param {*} layer
     * @param {*} isOutput
     * @param {*} bias
     */
    constructor(layer, isOutput, id) {
        // Layer 0: input, hidden after
        this.layer = layer;
        this.isOutput = isOutput;
        this.id = id;
        this.outboundConnections = [];
        this.inputValues = [];
        this.outputValue = 0;
    }
    static isConnected(node1, node2) {
        if (node1.outputsTo(node2) || node2.outputsTo(node1)) {
            return true;
        }
        return false;
    }
    addInput(val) {
        this.inputValues.push(val);
        if (this.layer == 0 && this.inputValues.length > 1) {
            console.error("Input node has more than one input value");
        }
    }
    calculateOutputAndSendFoward() {
        if (this.layer == 0) {
            // Input layer has one input and no activation function
            this.outputValue = this.inputValues[0];
        }
        else {
            this.outputValue = Math.tanh(ACTIVATION_SLOPE * sumArr(this.inputValues));
        }
        for (let conn of this.outboundConnections) {
            // console.log("Happening at outbound")
            conn.toNode.addInput(this.outputValue * conn.weight);
        }
    }
    copy() {
        return new NeuralNode(this.layer, this.isOutput, this.id);
    }
    outputsTo(node) {
        if (this.layer == node.layer) {
            return false;
        }
        if (this.layer > node.layer) {
            return false;
        }
        for (let conn of this.outboundConnections) {
            if (conn.toNode == node) {
                return true;
            }
        }
    }
}
