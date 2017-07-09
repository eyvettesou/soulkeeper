import React, { Component } from 'react';
import './App.css';
import soulsPortal from './images/soulsportal.gif';

const impCostInit = 10;
const gobCostInit = 50;

class App extends Component {
  constructor(props){
    super(props);

    window.save = JSON.parse(localStorage.getItem('save')) || {
      souls: "0",
      totalSouls: "0",
      imps: "0",
      gobs: "0",
    };

    this.state={
      souls: parseInt(window.save.souls, 10),
      totalSouls: parseInt(window.save.totalSouls, 10),
      save: window.save,

      imps: parseInt(window.save.imps, 10),
      gobs: parseInt(window.save.gobs, 10),

      impCost: impCostInit,
      gobCost: gobCostInit,
    }
  }

  soulClick = () => {
    var clickIncrement = 1;

    this.setState({
      souls: this.state.souls + clickIncrement,
      totalSouls: this.state.totalSouls + clickIncrement
    })
  }

  buyDemon = (demonName) => {
    if (demonName == 'imp') {
      if (this.state.souls >= this.state.impCost) {
        this.setState({
          souls: this.state.souls - this.state.impCost,
          imps: this.state.imps + 1,
          impCost: impCostInit * Math.pow(1.07, this.state.imps),
        });

      }
    } else if (demonName == 'gob') {
      if (this.state.souls >= this.state.gobCost) {
        this.setState({
          souls: this.state.souls - this.state.gobCost,
          gobs: this.state.gobs + 1
        });
      }
    };
  }

  demonIncrement = () => {
    this.setState({
      souls:
        this.state.souls
        + this.state.imps
        + (this.state.gobs * 2),
      totalSouls:
        this.state.totalSouls
        + this.state.imps
        + (this.state.gobs * 2),
    })
  }

  saveGame = () => {
    this.setState({
      save: {
        souls: this.state.souls,
        imps: this.state.imps,
        gobs: this.state.gobs,
        totalSouls: this.state.totalSouls,
      }
    })

    localStorage.setItem('save', JSON.stringify(this.state.save));
  }

  resetGame = () => {
    this.setState({
      souls: 0,
      imps: 0,
      gobs: 0,
      totalSouls: 0,
      save: {
        souls: "0",
        totalSouls: "0",
        imps: "0",
        gobs: "0",
      }
    })

    localStorage.setItem('save', JSON.stringify(this.state.save));
  }

  componentDidMount() {
    var tick = setInterval(this.demonIncrement, 1000);
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
          {this.state.souls}
          <a onClick={this.soulClick}>
            <img src={soulsPortal} alt="soulsPortal" />
          </a>
        </div>

        <div className="App-purchases">

          <div className="App-demons">
            Imps: {this.state.imps}<br />
            Cost: {this.state.impCost}<br />
            <button
              className="App-demon-button"
              onClick={
                () => this.buyDemon('imp')
              }
            > Buy Imp </button>
          </div>

          <div className="App-demons">
            Goblins: {this.state.gobs}<br />
            Cost: {this.state.gobCost}<br />
            <button
              className="App-demon-button"
              onClick={
                () => this.buyDemon('gob')
              }> Buy Goblin </button>
          </div>

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
