import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      souls: 0,
      imps: 0,
      impCost: 10,
    }
  }

  soulClick = () => {
    var clickIncrement = 1;

    this.setState({
      souls: this.state.souls + clickIncrement
    })
  }

  impIncrement = () => {
    this.setState({
      souls: this.state.souls + this.state.imps
    })
  }

  buyImp = () => {
    if (this.state.souls >= this.state.impCost) {
      this.setState({
        souls: this.state.souls - this.state.impCost,
        imps: this.state.imps + 1
      });
    }
  }

  componentDidMount() {
    var tick = setInterval(this.impIncrement, 1000);
    this.setState({tick: tick});
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.soulClick}>Soul</button>
        {this.state.souls}
        <br /><br />

        Imps: {this.state.imps}<br />
        Cost: {this.state.impCost}<br />
        <button onClick={this.buyImp}>Buy Imp</button>
      </div>
    );
  }
}

export default App;
