import React, { Component } from 'react';
import './App.css';
import soulsPortal from './images/soulsportal.gif';

const impCostInit = 10;
const gobCostInit = 100;
const jackCostInit = 666;
const wraithCostInit = 5000;
{/* 
imp
gob
jackal
wraith
succubus
warlock
demon warlord
fallen angel
*/}

class App extends Component {
  constructor(props){
    super(props);

    window.save = JSON.parse(localStorage.getItem('save')) || {
      souls: "0",
      totalSouls: "0",

      imps: "0",
      gobs: "0",
      jacks: "0",
      wraiths: "0",

      impCost: impCostInit,
      gobCost: gobCostInit,
      jackCost: jackCostInit,
      wraithCost: wraithCostInit,
    };

    this.state={
      souls: parseInt(window.save.souls, 10),
      totalSouls: parseInt(window.save.totalSouls, 10),
      save: window.save,

      imps: parseInt(window.save.imps, 10),
      gobs: parseInt(window.save.gobs, 10),
      jacks: parseInt(window.save.jacks, 10),
      wraiths: parseInt(window.save.wraiths, 10),

      impCost: parseInt(window.save.impCost, 10),
      gobCost: parseInt(window.save.gobCost, 10),
      jackCost: parseInt(window.save.jackCost, 10),
      wraithCost: parseInt(window.save.wraithCost, 10),
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
    if (demonName === 'imp') {
      if (this.state.souls >= this.state.impCost) {
        this.setState({
          souls: this.state.souls - this.state.impCost,
          imps: this.state.imps + 1,
          impCost: Math.round(impCostInit * Math.pow(1.20, this.state.imps)),
        });
      }
    } else if (demonName === 'gob') {
      if (this.state.souls >= this.state.gobCost) {
        this.setState({
          souls: this.state.souls - this.state.gobCost,
          gobs: this.state.gobs + 1,
          gobCost: Math.round(gobCostInit * Math.pow(1.15, this.state.gobs)),
        });
      }
    } else if (demonName === 'jack') {
      if (this.state.souls >= this.state.jackCost) {
        this.setState({
          souls: this.state.souls - this.state.jackCost,
          gobs: this.state.jacks + 1,
          gobCost: Math.round(jackCostInit * Math.pow(1.08, this.state.jacks)),
        });
      }
    } else if (demonName === 'wraith') {
      if (this.state.souls >= this.state.wraithCost) {
        this.setState({
          souls: this.state.souls - this.state.wraithCost,
          gobs: this.state.wraiths + 1,
          gobCost: Math.round(wraithCostInit * Math.pow(1.18, this.state.wraiths)),
        });
      }
    };
  }

  demonIncrement = () => {
    this.setState({
      souls:
        this.state.souls
        + this.state.imps
        + (this.state.gobs * 5)
        + (this.state.jacks * 25)
        + (this.state.wraiths * 150),
      totalSouls:
        this.state.totalSouls
        + this.state.imps
        + (this.state.gobs * 5)
        + (this.state.jacks * 25)
        + (this.state.wraiths * 150),
    })
  }

  saveGame = () => {
    this.setState({
      save: {
        souls: this.state.souls,
        totalSouls: this.state.totalSouls,

        imps: this.state.imps,
        gobs: this.state.gobs,
        jacks: this.state.jacks,
        wraiths: this.state.wraiths,

        impCost: this.state.impCost,
        gobCost: this.state.gobCost,
        jackCost: this.state.jackCost,
        wraithCost: this.state.wraithCost,
      }
    })

    localStorage.setItem('save', JSON.stringify(this.state.save));
  }

  resetGame = () => {
    this.setState({
      souls: 0,
      totalSouls: 0,

      imps: 0,
      gobs: 0,
      jacks: 0,
      wraiths: 0,

      impCost: impCostInit,
      gobCost: gobCostInit,
      jackCost: jackCostInit,
      wraithCost: wraithCostInit,
      
      save: {
        souls: "0",
        totalSouls: "0",

        imps: "0",
        gobs: "0",
        jacks: "0",
        wraiths: "0",

        impCost: impCostInit,
        gobCost: gobCostInit,
        jackCost: jackCostInit,
        wraithCost: wraithCostInit,
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
