const brain = require('brain');
const pathDFInder = require('pathfinding');

const options = {
    errorThresh: 0.005, // error threshold to reach
    iterations: 19999, // maximum training iterations
    log: true, // console.log() progress periodically
    logPeriod: 50, // number of iterations between logging
    learningRate: 0.5 // learning rate
}
var network = new brain.NeuralNetwork({ hiddenLayers: [8, 4, 2] });
const direction = 0; // 0:up ,1:upright ,3:right ... 7:upleft
const traces = [
        [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 6, y: 2 }], // downtraces
        [{ x: 2, y: 10 }, { x: 2, y: 9 }, { x: 2, y: 8 }], // uptraces
    ]
    // const rightTraces = [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }];
    // const leftTraces = [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }];
    // const upleftTraces = [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }];
    // const uprightTraces = [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }];
    // const downleftTraces = [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }];
    // const downrightTraces = [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }];

var train = function(trace) {
    network.train({ input: { x: trace, y: trace }, output: { direction: getDirection(trace) } }, options);
}

var getDirection = function(arr) {
    return arr[0].x === arr[1].x && arr[2].x === arr[1].x ? arr[0].y === arr[1].y && arr[2].y === arr[1].y ? -1 : arr[2].y < arr[1].y ? 2 : 0 : arr[0].y === arr[1].y && arr[2].y === arr[1].y ? arr[2].x < arr[1].x ? 3 : 1 : -1;
}

for (let i = 0; i < traces.length; i++) {
    train(traces[i]);
}
var output = network.run({ x: 3, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 8 });
console.log("output: ", output);
module.exports = brain;