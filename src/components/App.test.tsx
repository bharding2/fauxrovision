import * as React from 'react';
import {shallow} from 'enzyme';
import {App} from './App';

describe('App', () => {
  it('renders a keep builder', () => {
    const subject = shallowRender({});

    expect(subject.find('.App').exists()).toBe(true);
  });
});

interface OptionalProps {}

const shallowRender = (props: OptionalProps) => {
  return shallow(<App {...makeProps(props)} />)
};

const makeProps = (props: OptionalProps) => {
  return {};
};