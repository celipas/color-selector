const brain = require('brain.js')

const net = new brain.NeuralNetwork()
const trainingData = [
    //garbage in...garbage out
    { input: { height: 60, weight: 150 }, output: [1] },
    //lets give our Neural Net some more data
    { input: { height: 30, weight: 60 }, output: [0] },
    { input: { height: 30, weight: 60 }, output: [0] },
    { input: { height: 73, weight: 250 }, output: [1] },


]

net.train(trainingData)

const result = net.run({ height: 70, weight: 200 })
console.log(result)
