import React from 'react';

class Demon extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { index, demon } = this.props;
    return(
      <div>
        <button>{demon[index].name}</button>
      </div>
    );
  }
}

export default Demon;
