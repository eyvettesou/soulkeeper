import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LocalStorageMock from './setupTestFramework';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  // console.log(wrapper)
});
