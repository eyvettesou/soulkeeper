import React, { Component } from 'react';
import './App.css';
import { Icon } from 'antd';
import soulsPortal from './images/soulsportal.gif';

const impCostInit = 10;
const gobCostInit = 100;
const jackCostInit = 666;
const wraithCostInit = 5000;

const impCostRatio = 1.2;
const gobCostRatio = 1.15;
const jackCostRatio = 1.08;
const wraithCostRatio = 1.18;

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

      impMultiplier: "1",
    };

    this.state={
      souls: parseInt(window.save.souls, 10),
      totalSouls: parseInt(window.save.totalSouls, 10),
      save: window.save,

      demon: {
        michael: 1,
      },

      imps: parseInt(window.save.imps, 10),
      gobs: parseInt(window.save.gobs, 10),
      jacks: parseInt(window.save.jacks, 10),
      wraiths: parseInt(window.save.wraiths, 10),

      impCost: parseInt(window.save.impCost, 10),
      gobCost: parseInt(window.save.gobCost, 10),
      jackCost: parseInt(window.save.jackCost, 10),
      wraithCost: parseInt(window.save.wraithCost, 10),

      impMultiplier: parseInt(window.save.impMultiplier, 10),
    }
  }

  soulClick = () => {
    var clickIncrement = 1;

    this.setState({
      souls: this.state.souls + clickIncrement,
      totalSouls: this.state.totalSouls + clickIncrement
    })
  }

  buyDemon = (demonName, demonCost, demonCostInit, ratio) => {
    if (this.state.souls >= this.state[demonCost]) {
      this.setState({
        souls: this.state.souls - this.state[demonCost],
        [demonName]: this.state[demonName] + 1,
        [demonCost]: Math.round(demonCostInit * Math.pow(ratio, this.state[demonName])),
      });
    }
  }

  upgradeImprovements = () => {
    if (this.state.souls >= 500) {
      this.setState({
        souls: this.state.souls - 500,
        impMultiplier: 2,
      });
    }
  }

  demonIncrement = () => {
    this.setState({
      souls:
        this.state.souls
        + (this.state.imps * this.state.impMultiplier)
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

        impMultiplier: this.state.impMultiplier,
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

      impMultiplier: 1,

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

        impMultiplier: 1,
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
        <div className="App-left">
          {this.state.souls}
          <a onClick={this.soulClick}>
            <img src={soulsPortal} alt="soulsPortal" />
          </a>

          <div>
            Total Souls Collected:
            {this.state.totalSouls}
          </div>

          <div>
            <button onClick={this.saveGame}>Save Game</button>
            <button onClick={this.resetGame}>Reset Game</button>
          </div>
        </div>

        <div className ="App-right">

          <div className = "App-purchases">
            <h2>Upgrades</h2>
            <div className = "App-upgrades">
              <a
                onClick={
                  () => this.upgradeImprovements()
                }>
                Imp-rovements<br/>
                <Icon type="caret-up" style={{ fontSize: 45, margin: '0.2em' }} />
              </a>
              <a>
                <Icon type="star" style={{ fontSize: 45, margin: '0.2em' }} />
              </a>
              <a>
                <Icon type="team" style={{ fontSize: 45, margin: '0.2em' }} />
              </a>
            </div>
          </div>

          <div className="App-purchases">
            <h2>Demons</h2>
            <div className="App-demons">
              Imps: {this.state.imps}<br />
              Cost: {this.state.impCost}<br />
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon('imps', 'impCost', impCostInit, impCostRatio)
                }
              > Buy Imp </button>
            </div>

            <div className="App-demons">
              Goblins: {this.state.gobs}<br />
              Cost: {this.state.gobCost}<br />
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon('gobs', 'gobCost', gobCostInit, gobCostRatio)
                }> Buy Goblin </button>
            </div>

            <div className="App-demons">
              Jackals: {this.state.jacks}<br />
              Cost: {this.state.jackCost}<br />
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon('jacks', 'jackCost', jackCostInit, jackCostRatio)
                }> Buy Jackal </button>
            </div>

            <div className="App-demons">
              Wraiths: {this.state.wraiths}<br />
              Cost: {this.state.wraithCost}<br />
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon('wraiths', 'wraithCost', wraithCostInit, wraithCostRatio)
                }> Buy Wraith </button>
            </div>
          </div>

        </div>


      </div>
    );
  }
}

export default App;
