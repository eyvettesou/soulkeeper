import React, { Component } from 'react';
import './App.css';
import soulsPortal from './images/soulsportal.gif';

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
      imps: parseInt(window.save.imps, 10),
      impCost: 10,
      gobs: parseInt(window.save.gobs, 10),
      gobCost: 100,
      totalSouls: parseInt(window.save.totalSouls, 10),
      save: window.save,
      demonName: '',
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

  buyDemon = (props) => {
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
          {this.state.souls}
          <a onClick={this.soulClick}>
            <img src={soulsPortal} alt="soulsPortal" />
          </a>
        </div>

        <div className="App-purchases">
          <div className="App-demons">
            Imps: {this.state.imps}<br />
            Cost: {this.state.impCost}<br />
            <button className="App-demon-button" onClick={this.buyImp}>Buy Imp</button>
          </div>
          <div className="App-demons">
            Goblins: {this.state.gobs}<br />
            Cost: {this.state.gobCost}<br />
            <button className="App-demon-button" onClick={this.buyGob}>Buy Goblin</button>
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
