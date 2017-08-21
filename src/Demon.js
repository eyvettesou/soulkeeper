import React from 'react';

class Demon extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { demonType, name, ratio, quantity, cost, buyDemon } = this.props;
    return(
      <div className="App-demons">
        <div className="App-demon-description">
          {name}s: {quantity}<br />
          Cost: {cost}<br />
        </div>
        <button
          className="App-demon-button"
          onClick={
            () => buyDemon(demonType)
          }
        > Buy {name} </button>
      </div>
    );
  }
}

export default Demon;