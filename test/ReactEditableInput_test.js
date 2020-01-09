import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import ReactEditableInput from '../src/components/ReactEditableInput';

Enzyme.configure({ adapter: new Adapter() });

describe('Simple text', () => {
  it('Should be an empty container', () => {
    const wrapper = render(<ReactEditableInput />);
    expect(wrapper.text()).toHaveLength(0);
    expect(wrapper.find('input')).toHaveLength(0);
  });
  it('Should be a text container', () => {
    const wrapper = mount(<ReactEditableInput value="123" />);
    expect(wrapper.html()).toEqual('<div class=""><span>123</span></div>');
  });
  it('Should be a text container with class', () => {
    const wrapper = mount(<ReactEditableInput value="123" rootContainerClass="rootContainerClass" />);
    expect(wrapper.html()).toEqual('<div class="rootContainerClass"><span>123</span></div>');
  });
  it('Should be a container with input ', () => {
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      editMode={true}
    />);
    expect(wrapper.html()).toEqual('<div class="rootContainerClass"><input type="text" value="123"></div>');
  });
  it('Should be a container with input and edit class', () => {
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      editMode={true}
    />);
    expect(wrapper.html()).toEqual('<div class="rootContainerClass rootContainerClassActive"><input type="text" value="123"></div>');
  });
  it('Should be a container with text and no edit class', () => {
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      editMode={false}
    />);
    expect(wrapper.html()).toEqual('<div class="rootContainerClass"><span>123</span></div>');
  });
  it('Should be a text container and clickable', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      toggleEditMode={onButtonClick}
      editMode={false}
    />);
    wrapper.find('div').simulate('click');
    expect(onButtonClick).toHaveProperty('callCount', 1);
  });
  it('Should be an input container and not clickable', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      toggleEditMode={onButtonClick}
      editMode={true}
    />);
    wrapper.find('div').simulate('click');
    expect(onButtonClick).toHaveProperty('callCount', 0);
  });
  it('Should be an input container and call change listener', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      changeListener={onButtonClick}
      editMode={true}
    />);
    wrapper.find('input').simulate('change', { target: { value: '1234' }});
    expect(onButtonClick).toHaveProperty('callCount', 1);
    expect(wrapper.find('input').at(0).prop('value')).toEqual('123');
  });
  it('Should be an input container and edit end', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<ReactEditableInput
      value="123"
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      onEditEnd={onButtonClick}
      editMode={true}
    />);
    wrapper.find('input').simulate('keyPress', { key: '1'});
    expect(onButtonClick).toHaveProperty('callCount', 0);
    expect(wrapper.find('input').at(0).prop('value')).toEqual('123');
    wrapper.find('input').simulate('keyPress', { key: 'Enter'});
    expect(onButtonClick).toHaveProperty('callCount', 1);
  });

  it('Should be an input container and change text', () => {
    const teststate = { value: '123' };
    const wrapper = mount(<ReactEditableInput
      value={teststate.value}
      rootContainerClass="rootContainerClass"
      rootContainerEditClass="rootContainerClassActive"
      changeListener={(e) => { wrapper.setProps({value: e.target.value}); teststate.value = e.target.value; }}
      onEditEnd={(e) => (wrapper.setProps({editMode: false, value: teststate.value}))}
      editMode={true}
    />);
    wrapper.find('input').at(0).simulate('change', { target: { value: '1231' } });
    expect(wrapper.find('input').at(0).prop('value')).toEqual('1231');
    wrapper.find('input').at(0).simulate('keyPress', { key: 'Enter' });
    expect(wrapper.html()).toEqual('<div class="rootContainerClass"><span>1231</span></div>');
  });
});
