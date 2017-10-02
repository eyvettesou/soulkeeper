import React from 'react';
import fullStory from './fullStory.js';

class Story extends React.Component {
  nextStep = (nextLine) => {
    const availableStories = [];

    availableStories.push(fullStory[0]);

    if(this.props.totalSouls >= 1){
      availableStories.push(fullStory[1]);
    }
    if(this.props.totalSouls >= 25){
      availableStories.push(fullStory[2]);
    }


    return(availableStories.includes(nextLine));
  }

  render(){
    const {totalSouls} = this.props;
    return(
      <div style={{padding: '20px 0'}}>
        {
          fullStory
            .filter(this.nextStep)
            .map( (nextLine) => {
              return (
                <p>
                  {nextLine}
                </p>
              )
            })
        }
      </div>
    );
  };
};

export default Story;
