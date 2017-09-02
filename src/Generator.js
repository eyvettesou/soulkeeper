import React from 'react';

class Generator extends React.Component {
  capitalizeName = (generator) => {
    let name = generator[0].toUpperCase() + generator.slice(1);
    return name;
  }

  pluralizeName = (generator) => {
    let name = generator + 's';
    return name;
  }

  render(){
    const { generator, quantity, cost, buyDemon } = this.props;
    return(
      <div className="App-demons">
        <div className="App-demon-description">
          {this.pluralizeName(this.capitalizeName(generator))}: {quantity}<br />
          Cost: {cost}<br />
        </div>
        <button
          className="App-demon-button"
          onClick={
            () => buyDemon(generator)
          }
        > Buy {this.capitalizeName(generator)} </button>
      </div>
    );
  }
}

Generator.defaultProps = {
  generator:  'Unknown',
  quantity:   '0',
  cost:       '0',
};

export default Generator;
