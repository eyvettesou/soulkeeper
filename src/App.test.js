import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LocalStorageMock from './setupTestFramework';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
});

describe('<App /> ', () => {
  it('renders four generators', ()=> {

  });
});

describe('<App /> functions ', () => {
  const wrapper = shallow(<App />);

  const resetGeneratorData = JSON.parse(JSON.stringify(wrapper.instance().state.generators));

  const mockGeneratorData = JSON.parse(JSON.stringify(wrapper.instance().state.generators));
  mockGeneratorData.imp.quantity = 10;
  mockGeneratorData.imp.cost = 20;
  mockGeneratorData.gob.quantity = 2;
  mockGeneratorData.gob.cost = 200;
  mockGeneratorData.jack.quantity = 10;
  mockGeneratorData.jack.cost = 100;
  mockGeneratorData.wraith.quantity = 5;
  mockGeneratorData.wraith.cost = 10;

  const mockState = {
    souls: 50000,
    totalSouls: 50000,
    lifetimeSouls: 30,
    angelSouls: 40,
    generators: mockGeneratorData,
    impMultiplier: 50
  };

  describe('soulClick', () => {
    it('increases souls state by 1', ()=> {
      const originalSoulCount = JSON.parse(JSON.stringify(wrapper.instance().state.souls));

      wrapper.instance().soulClick();

      expect(wrapper.instance().state.souls).toBe(originalSoulCount + 1);
    });
  });

  describe('soulsPerSecond', () => {
    it('calculates total production of souls correctly', () => {
      wrapper.setState(mockState);
      const returnedValue = wrapper.instance().soulsPerSecond();
      
      expect(returnedValue).toBe(2718);
    });
  });

  describe('saveGame', () => {
    it('sets save state with current state values', () => {
      wrapper.instance().saveGame();

      expect(wrapper.instance().state.save).toEqual(mockState);
    });
  });

  describe('prestigeGame', () => {
    it('updates lifetimeSouls to the correct value', () => {
      wrapper.instance().prestigeGame();

      expect(wrapper.instance().state.lifetimeSouls).toBe(50030);
    });

    it('updates angelSouls to the correct value', () => {
      expect(wrapper.instance().state.angelSouls).toBe(45);
    });
  });

  describe('resetGame', () => {
    it('sets save state to original values', () => {
      const resetSaveState = {
        souls: 0,
        totalSouls: 0,
        lifetimeSouls: 0,
        angelSouls: 0,
        generators: resetGeneratorData,
        impMultiplier: 1
      };

      wrapper.instance().resetGame('0', '0');

      // why is it that i can only call the function within a test case
      expect(wrapper.instance().state.save).toEqual(resetSaveState);
    });

    it('sets soul state to original value', () => {
      expect(wrapper.instance().state.souls).toBe(0);
    });

    it('sets totalSouls state to original value', () => {
      expect(wrapper.instance().state.totalSouls).toBe(0);
    });

    it('sets lifetimeSouls state to original value', () => {
      expect(wrapper.instance().state.lifetimeSouls).toBe(0);
    });

    it('sets angelSouls state to original value', () => {
      expect(wrapper.instance().state.angelSouls).toBe(0);
    });

    it('sets generator state to original value', () => {
      expect(wrapper.instance().state.generators).toEqual(resetGeneratorData);
    });
  });
});
