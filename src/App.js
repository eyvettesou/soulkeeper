import React, { Component } from 'react';
import './App.css';
import { Icon } from 'antd';
import soulsPortal from './images/soulsportal.gif';
import Demon from './Demon';

const impCostInit = 10;
const gobCostInit = 100;
const jackCostInit = 666;
const wraithCostInit = 5000;

const impCostRatio = 1.2;
const gobCostRatio = 1.15;
const jackCostRatio = 1.08;
const wraithCostRatio = 1.18;

let demonsCostInit = {
  imp: 10,
  gob: 100
}

let demonsCostRatio = {
  imp: 1.2,
  gob: 1.15
}


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
      lifetimeSouls: "0",
      angelSouls: "0",

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
      save: window.save,

      souls: parseInt(window.save.souls, 10),
      soulsPerSecond: "0",
      totalSouls: parseInt(window.save.totalSouls, 10),
      lifetimeSouls: parseInt(window.save.lifetimeSouls, 10),
      angelSouls: parseInt(window.save.angelSouls, 10),


      demon: [
        {
          name: 'imps',
          quantity: parseInt(window.save.imps, 10),
          cost: parseInt(window.save.impCost, 10),
          ratio: demonsCostRatio.imp,
        },
        {
          name: 'gobs',
          quantity: parseInt(window.save.gobs, 10),
          cost: parseInt(window.save.gobCost, 10),
          ratio: demonsCostRatio.gob,
        },
      ],

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
      totalSouls: this.state.totalSouls + clickIncrement,
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

  buyDemon2 = (demon, initCost) => {
    const newDemonInformation = this.state.demon
    console.log(newDemonInformation)
    if (this.state.souls >= demon.cost) {
      newDemonInformation[0].cost = Math.round(initCost * Math.pow(demon.ratio, demon.quantity));
      newDemonInformation[0].quantity ++;
      console.log(newDemonInformation[0])

      this.setState({
        demon: newDemonInformation,
      })

      console.log(this.state.demon);
    };

  }


  upgradeImprovements = () => {
    if (this.state.souls >= 500) {
      this.setState({
        souls: this.state.souls - 500,
        impMultiplier: 2,
      });
    }
  }

  soulsPerSecond = () => {
    return(
      (
        (this.state.imps * this.state.impMultiplier)
        + (this.state.gobs * 5)
        + (this.state.jacks * 25)
        + (this.state.wraiths * 150)
      ) * ( 1 + 0.02 * this.state.angelSouls )
    )
  }

  demonIncrement = () => {
    this.setState({
      souls:
        this.state.souls + this.soulsPerSecond() * 0.1,
      totalSouls:
        this.state.totalSouls + this.soulsPerSecond() * 0.1,
      soulsPerSecond:
        this.soulsPerSecond(),
    })
  }

  saveGame = () => {
    this.setState({
      save: {
        souls: this.state.souls,
        totalSouls: this.state.totalSouls,
        lifetimeSouls: this.state.lifetimeSouls,
        angelSouls: this.state.angelSouls,

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
    }, () => {
      this.handleCache();
    });
  }

  resetGame = (lifetime, angel) => {
    this.setState({
      souls: 0,
      totalSouls: 0,
      lifetimeSouls: lifetime,
      angelSouls: angel,

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
        lifetimeSouls: lifetime,
        angelSouls: angel,

        imps: "0",
        gobs: "0",
        jacks: "0",
        wraiths: "0",

        impCost: impCostInit,
        gobCost: gobCostInit,
        jackCost: jackCostInit,
        wraithCost: wraithCostInit,

        impMultiplier: "1",
      }
    }, () => {
      this.handleCache();
    });
  }

  prestigeGame = () => {
    this.setState({
      lifetimeSouls: this.state.lifetimeSouls + this.state.totalSouls,
      angelSouls: this.state.angelSouls + Math.floor(this.state.totalSouls/10000),
    }, () => {
      this.resetGame(this.state.lifetimeSouls, this.state.angelSouls);
    });
  }

  handleCache = () => {
    localStorage.setItem('save', JSON.stringify(this.state.save));
  }

  renderStore = (index) => {
    return <Demon
      index={index}
      demon={this.state.demon}
    />
  }

  componentDidMount() {
    setInterval(this.demonIncrement, 100);
  }

  render() {
    return (
      <div className="App">
        <div className="App-left">
          {
            this.state.demon
              .map((name, index) => {
                return (
                  this.renderStore(index)
                )
              }
            )
          }

          <div>
            Total Souls Collected:
            {Math.round(this.state.totalSouls).toLocaleString()}
          </div>
          <div className="App-game">
            <button onClick={this.prestigeGame}  className="App-game-button">Prestige</button>
            <button onClick={this.saveGame} className="App-game-button">Save Game</button>
            <button onClick={
              () => this.resetGame(0, 0)
            }  className="App-game-button">Reset Game</button>
          </div>
        </div>

        <div className="App-middle">
          <a onClick={this.soulClick}>
            <img src={soulsPortal} alt="soulsPortal" />
          </a>
          <div className="App-soul-counters">
            <span style={{ display: 'block' }}>{Math.round(this.state.souls).toLocaleString()}</span>
            <span style={{ fontSize: '0.5em' }}>souls per second: {this.state.soulsPerSecond.toLocaleString()}</span>
          </div>
        </div>

        <div className ="App-right">

          <div className = "App-purchases">
            <h2>Upgrades</h2>
            <div className = "App-upgrades">
              <div className="App-upgrade-icons">
                <a onClick={ () => this.upgradeImprovements() } >
                  <Icon type="caret-up" style={{ fontSize: 45 }} />
                </a>
                <span className="App-upgrade-description">
                  <b>Imp-rovements</b><br />
                  Double Imp Production<br />
                  Cost: 500 Souls
                </span>
              </div>
              <div className="App-upgrade-icons">
                <a>
                  <Icon type="star" style={{ fontSize: 45 }} />
                </a>
                <span className="App-upgrade-description">Oh My Goblin!</span>
              </div>
              <div className="App-upgrade-icons">
                <a> <Icon type="team" style={{ fontSize: 45 }} /> </a>
                <span className="App-upgrade-description">Grapes of Wraiths</span>
              </div>
            </div>
          </div>

          <div className="App-purchases">
            <h2>Demons</h2>
            <div className="App-demons">
              <div className="App-demon-description">
                {this.state.demon[0].name}: {this.state.demon[0].quantity}<br />
                Cost: {this.state.demon[0].cost}<br />
              </div>
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon2(this.state.demon[0], demonsCostInit.imp)
                }
              > Buy Imp </button>
            </div>

            <div className="App-demons">
              <div className="App-demon-description">
                {this.state.demon[1].name}: {this.state.demon[1].quantity}<br />
                Cost: {this.state.demon[1].cost}<br />
              </div>
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon('gobs', 'gobCost', gobCostInit, gobCostRatio)
                }> Buy Goblin </button>
            </div>

            <div className="App-demons">
              <div className="App-demon-description">
                Jackals: {this.state.jacks}<br />
                Cost: {this.state.jackCost}<br />
              </div>
              <button
                className="App-demon-button"
                onClick={
                  () => this.buyDemon('jacks', 'jackCost', jackCostInit, jackCostRatio)
                }> Buy Jackal </button>
            </div>

            <div className="App-demons">
              <div className="App-demon-description">
                Wraiths: {this.state.wraiths}<br />
                Cost: {this.state.wraithCost}<br />
              </div>
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
