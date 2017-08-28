import React from 'react';

class Demon extends React.Component {
  capitalizeName = (demonType) => {
    let name = demonType[0].toUpperCase() + demonType.slice(1);
    return name;
  }

  pluralizeName = (demonType) => {
    let name = this.capitalizeName(demonType) + 's';
    return name;
  }

  render(){
    const { demonType, quantity, cost, buyDemon } = this.props;
    return(
      <div className="App-demons">
        <div className="App-demon-description">
          {this.pluralizeName(demonType)}: {quantity}<br />
          Cost: {cost}<br />
        </div>
        <button
          className="App-demon-button"
          onClick={
            () => buyDemon(demonType)
          }
        > Buy {this.capitalizeName(demonType)} </button>
      </div>
    );
  }
}

export default Demon;
