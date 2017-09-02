import React from 'react';
import ReactDOM from 'react-dom';
import Demon from './Demon';
import { shallow } from 'enzyme';

describe('<Demon /> default props successfully loads', () => {
  const wrapper = shallow(<Demon />);

  it('demonType', () => {
    expect(wrapper.instance().props.demonType).toBe('Unknown');
  });

  it('quantity', () => {
    expect(wrapper.instance().props.quantity).toBe('0');
  });

  it('cost', () => {
    expect(wrapper.instance().props.cost).toBe('0');
  });
});

describe('<Demon /> functions', () => {
  const word = 'goblin';
  const wrapper = shallow(<Demon />);

  it('capitalizeName capitalizes first letter of any word', () => {
      expect(wrapper.instance().capitalizeName(word)).toBe('Goblin');
  });

  it ('pluralizeName adds the letter s to any word', () =>{
    expect(wrapper.instance().pluralizeName(word)).toBe('goblins');
  });
});

describe('<Demon /> props successfully renders', () => {
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

  it('name', () => {
    expect(wrapper.text()).toContain('Imps: ');
  });

  it('quantity', () => {
    expect(wrapper.text()).toContain(quantity);
  });

  it('cost', () => {
    expect(wrapper.text()).toContain(`Cost: ${cost}`);
  });

  it('button text', () => {
    expect(wrapper.text()).toContain('Buy Imp');
  });
});
