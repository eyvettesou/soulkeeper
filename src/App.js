import React, { Component } from 'react';
import './App.css';
import soulsPortal from './images/soulsportal.gif';
import Generator from './Generator';

let initialGeneratorDetails = {
  imp: {
    name: "Imp",
    quantity: "0",
    cost: "10",
    ratio: 1.2,
  },
  gob: {
    name: "Goblin",
    quantity: "0",
    cost: "100",
    ratio: 1.2,
  },
  jack: {
    name: "Jackal",
    quantity: "0",
    cost: "666",
    ratio: 1.08,
  },
  wraith: {
    name: "Wraith",
    quantity: "0",
    cost: "5000",
    ratio: 1.18,
  },
}

let initialGeneratorStates = {
  imp: {
    quantity: initialGeneratorDetails.imp.quantity,
    cost: initialGeneratorDetails.imp.cost,
  },
  gob: {
    quantity: initialGeneratorDetails.gob.quantity,
    cost: initialGeneratorDetails.gob.cost,
  },
  jack: {
    quantity: initialGeneratorDetails.jack.quantity,
    cost: initialGeneratorDetails.jack.cost,
  },
  wraith: {
    quantity: initialGeneratorDetails.wraith.quantity,
    cost: initialGeneratorDetails.wraith.cost,
  },
}

let generatorNames = Object.keys(initialGeneratorDetails);

class App extends Component {
  constructor(props){
    super(props);

    window.save = JSON.parse(localStorage.getItem('save')) || {
      souls: "0",
      totalSouls: "0",
      lifetimeSouls: "0",
      angelSouls: "0",
      demon: initialGeneratorStates,
      impMultiplier: "1",
    };

    this.state={
      save: window.save,
      souls: parseInt(window.save.souls, 10),
      soulsPerSecond: "0",
      totalSouls: parseInt(window.save.totalSouls, 10),
      lifetimeSouls: parseInt(window.save.lifetimeSouls, 10),
      angelSouls: parseInt(window.save.angelSouls, 10),
      demon: window.save.demon,
      impMultiplier: parseInt(window.save.impMultiplier, 10),
    };
  };

  soulClick = () => {
    var clickIncrement = 1;

    this.setState({
      souls: this.state.souls + clickIncrement,
      totalSouls: this.state.totalSouls + clickIncrement,
    })
  };

  buyGenerator = (generator) => {
    const generatorInitial = initialGeneratorDetails[generator]
    const generatorInformation = this.state.demon[generator];
    const newGeneratorsInformation = JSON.parse(JSON.stringify(this.state.demon));

    if (this.state.souls >= generatorInformation.cost) {
      newGeneratorsInformation[generator].cost = Math.round(generatorInitial.cost * Math.pow(generatorInitial.ratio, generatorInformation.quantity));
      newGeneratorsInformation[generator].quantity ++;

      this.setState({
        souls: this.state.souls - generatorInformation.cost,
        demon: newGeneratorsInformation,
      })
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
    const demon = this.state.demon;

    return(
      (
        (demon.imp.quantity * this.state.impMultiplier)
        + (demon.gob.quantity * 5)
        + (demon.jack.quantity * 25)
        + (demon.wraith.quantity * 150)
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

        demon: this.state.demon,

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
      demon: initialGeneratorStates,
      impMultiplier: 1,

      save: {
        souls: "0",
        totalSouls: "0",
        lifetimeSouls: lifetime,
        angelSouls: angel,

        demon: initialGeneratorStates,

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

  componentDidMount() {
    setInterval(this.demonIncrement, 100);
  }

  render() {
    return (
      <div className="App">
        <div className="App-left">
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
                  Test
                </a>
                <span className="App-upgrade-description">
                  <b>Imp-rovements</b><br />
                  Double Imp Production<br />
                  Cost: 500 Souls
                </span>
              </div>
              <div className="App-upgrade-icons">
                <a>
                  Test2
                </a>
                <span className="App-upgrade-description">Oh My Goblin!</span>
              </div>
              <div className="App-upgrade-icons">
                <a> Test3</a>
                <span className="App-upgrade-description">Grapes of Wraiths</span>
              </div>
            </div>
          </div>

          <div className="App-purchases">
            <h2>Demons</h2>
            {
              generatorNames
                .map( (generator) => {
                  return (
                    <Generator
                      generator={generator}
                      quantity={this.state.demon[generator].quantity}
                      cost={this.state.demon[generator].cost}
                      buyGenerator={this.buyGenerator}
                    />
                  )
                }
              )
            }
          </div>

        </div>


      </div>
    );
  }
}

export default App;
