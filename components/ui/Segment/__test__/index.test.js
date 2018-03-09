import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Segment from '../index';

describe('Segment Tests', () => {
  let values;

  beforeEach(() => {
    values = ['栏目一', '栏目二', '栏目三'];
  });

  it('renders correctly', () => {
    const tree = Renderer.create((
      <Segment values={values} defaultIndex={0} />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('press event', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Segment values={values} defaultIndex={0} onChange={handler} />);
    expect(wrapper.instance().state.index).toBe(0);
    wrapper.childAt(1).simulate('press');
    expect(wrapper.instance().state.index).toBe(1);
    expect(handler).toHaveBeenCalled();
  });

  it('controled prop index', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Segment values={values} index={0} onChange={handler} />);
    expect(wrapper.instance().state.index).toBe(0);
    wrapper.childAt(1).simulate('press');
    expect(wrapper.instance().state.index).toBe(0);
    expect(handler).toHaveBeenCalled();
  });

  it('disabled segment', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Segment values={values} desabled onChang={handler} />);
    wrapper.childAt(1).simulate('press');
    expect(handler).not.toHaveBeenCalled();
  });
});
