import React, { useState } from 'react';
import { render } from 'react-dom';
import ReactEditableInput from './components/ReactEditableInput';

class Test extends React.Component {
  state = {
    editMode: false,
    value: 'test',
  };

  toggleEditMode = () => {
    const { editMode } = this.state;
    this.setState({
      editMode: true,
    });
  };

  onEditEnd = () => {
    this.setState({
      editMode: false,
    });
  };

  onEditChange = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };
  render() {
    const {
      editMode,
      value,
    } = this.state;
    return (
      <>
        <ReactEditableInput
          value={value}
        />
        <ReactEditableInput
          value={value}
          editMode={true}
        />
        <ReactEditableInput
          value={value}
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
        />
        <ReactEditableInput
          value={value}
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
          changeListener={this.onEditChange}
        />
        <ReactEditableInput
          value={value}
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
          changeListener={this.onEditChange}
          onEditEnd={this.onEditEnd}
        />
      </>
    );
  }
}

render(<Test />, document.getElementById('root'));
