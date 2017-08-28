import React from 'react';
import ReactDOM from 'react-dom';
import Demon from './Demon';
import { shallow } from 'enzyme';

describe('<Demon /> default', () => {
  const demonType = 'imp';
  const quantity = 44;
  const cost = 10;
  const wrapper = shallow(
    <Demon
      demonType={demonType}
      quantity={quantity}
      cost={cost}
    />
  );

  it('renders name correctly', () => {
    expect(wrapper.text()).toContain('Imps');
  });

  it('renders quantity correctly', () => {
    expect(wrapper.text()).toContain(quantity);
  });

  it('renders cost correctly', () => {
    expect(wrapper.text()).toContain(`Cost: ${cost}`);
  });

  it('renders button text correctly', () => {
    expect(wrapper.text()).toContain('Buy Imp');
  });

  console.log(wrapper.text());
})
