import React from 'react';
import ReactDOM from 'react-dom';
import Demon from './Demon';
import { shallow } from 'enzyme';

describe('<Demon /> to render', () => {
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

  it('name correctly', () => {
    expect(wrapper.text()).toContain('Imps');
  });

  it('quantity correctly', () => {
    expect(wrapper.text()).toContain(quantity);
  });

  it('cost correctly', () => {
    expect(wrapper.text()).toContain(`Cost: ${cost}`);
  });

  it('button text correctly', () => {
    expect(wrapper.text()).toContain('Buy Imp');
  });
});
