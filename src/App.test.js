import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  console.log(wrapper)
});

/*it('Returns all appropriate keys', () => {
  expect(demonTypeNames).toBe(['imp', 'gob', 'jackal', 'wraith'])
});*/
