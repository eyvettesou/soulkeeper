import React from 'react';
import ReactDOM from 'react-dom';
import Demon from './Demon';
import { shallow } from 'enzyme';

describe('<Demon /> default', () => {
  const demonType = 'imp';
  const name = 'Imp';
  const quantity = 0;
  const cost = 10;
  const wrapper = shallow(
    <Demon
      demonType={demonType}
      name={name}
      quantity={quantity}
      cost={cost}
    />
  );

  it('renders name correctly', () => {
    expect(wrapper.text()).toContain(name);
  });

  it('renders quantity correctly', () => {
    expect(wrapper.text()).toContain(quantity);
  });

  it('renders cost correctly', () => {
    expect(wrapper.text()).toContain(`Cost: ${cost}`);
  });

  it('renders button text correctly', () => {
    expect(wrapper.text()).toContain(`Buy ${name}`);
  });

  console.log(wrapper.text());
})
