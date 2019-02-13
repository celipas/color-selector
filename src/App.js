import React, { Component } from 'react';

import './App.css';
const brain = require('brain.js')

const net = new brain.NeuralNetwork()
const trainingData = [
  //to a man with a hammer every problem is a nail...
  { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
  { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
  { input: { r: 0.74, g: 0.78, b: 86 }, output: { light: 1 } },
  // ..to a neural net trained with only light colors every
  // input is a light color...let's add some more data!!
  { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
  { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
  { input: { r: 1, g: 0.97, b: 0 }, output: { light: 1 } },


]

net.train(trainingData)


const input = document.querySelector("input")
function getRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
    g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
    b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
  } : null;
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      background: '#ff0000',
      textColor: 'e4e4e4'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(color, event) {
    console.log(color)
    const rgb = getRgb(color)
    const result = brain.likely(rgb, net)
    console.log('result', result)
    console.log(rgb)
    let textColor
    //our text color is the opposite of the predicted background color score
    (result === 'dark') ?
      textColor = 'white' :
      textColor = 'black'

    this.setState({
      background: color,
      textColor: textColor
    });
  }

  render() {
    return (
      <div className="App"
        style={{ backgroundColor: this.state.background, padding: 200 }}>

        <input type="color"
          onChange={(event) => this.handleChange(event.target.value)}
        />

        <h1
          id="example"
          style={{ color: this.state.textColor }}>
          ML Example
          </h1>
      </div>
    );
  }
}

export default App;
