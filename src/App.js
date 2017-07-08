import React, { Component } from 'react';
import './App.css';
import soulsPortal from './images/soulsportal.gif';

class App extends Component {
  constructor(props){
    super(props);

    window.totalSouls = localStorage.getItem('totalSouls') || "0";
    window.souls = localStorage.getItem('souls') || "0";
    window.imps = localStorage.getItem('imps') || "0";
    window.gobs = localStorage.getItem('gobs') || "0";

    this.state={
      souls: parseInt(window.souls, 10),
      imps: parseInt(window.imps, 10),
      impCost: 10,
      gobs: parseInt(window.gobs, 10),
      gobCost: 100,
      totalSouls: parseInt(window.totalSouls, 10),
    }
  }

  soulClick = () => {
    var clickIncrement = 1;

    this.setState({
      souls: this.state.souls + clickIncrement,
      totalSouls: this.state.totalSouls + clickIncrement
    })
  }

  impIncrement = () => {
    this.setState({
      souls: this.state.souls + this.state.imps,
      totalSouls: this.state.totalSouls + this.state.imps
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

  gobIncrement = () => {
    this.setState({
      souls: this.state.souls + this.state.gobs,
      gobCost: this.state.gobs * 2,
      totalSouls: this.state.totalSouls + this.state.gobs
    })
  }

  buyGob = () => {
    if (this.state.souls >= this.state.gobCost) {
      this.setState({
        souls: this.state.souls - this.state.gobCost,
        gobs: this.state.gobs + 1
      });
    }
  }
  saveGame = () => {
    localStorage.setItem('souls', this.state.souls);
    localStorage.setItem('imps', this.state.imps);
    localStorage.setItem('gobs', this.state.gobs);
    localStorage.setItem('totalSouls', this.state.totalSouls);
  }

  resetGame = () => {
    localStorage.setItem('souls', 0);
    localStorage.setItem('imps', 0);
    localStorage.setItem('gobs', 0);
    localStorage.setItem('totalSouls', 0);
    
    this.setState({
      souls: 0,
      imps: 0,
      gobs: 0,
      totalSouls: 0
    })
  }

  componentDidMount() {
    var tick = setInterval(this.impIncrement, 1000);
    this.setState({tick: tick});
  }

  render() {
    return (
      <div className="App">
        <div>
          Total Souls Collected:
          {this.state.totalSouls}
        </div>
        <div className="App-souls">
          <div>
            {this.state.souls}

          </div>
          <a onClick={this.soulClick}>
            <img src={soulsPortal} alt="soulsPortal" />
          </a>
        </div>
        <div className="App-purchases">
          Imps: {this.state.imps}<br />
          Cost: {this.state.impCost}<br />
          <button onClick={this.buyImp}>Buy Imp</button>
        </div>
        <div className="App-purchases">
          Goblins: {this.state.gobs}<br />
          Cost: {this.state.gobCost}<br />
          <button onClick={this.buyGob}>Buy Goblin</button>
        </div>
        <div>
          <button onClick={this.saveGame}>Save Game</button>
          <button onClick={this.resetGame}>Reset Game</button>
        </div>
      </div>
    );
  }
}

export default App;
