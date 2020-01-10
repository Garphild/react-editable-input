import React from 'react';
import { render } from 'react-dom';
import ReactEditableInput from './components/ReactEditableInput';

class Test extends React.Component {
  state = {
    editMode: false,
    value: 'test',
  };

  toggleEditMode = () => {
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
        <label><b>Always close, not editable</b></label>
        <ReactEditableInput
          value={value}
        />
        <label><b>Always opened, not editable</b></label>
        <ReactEditableInput
          value={value}
          editMode
        />
        <label><b>Always opened, disabled</b></label>
        <ReactEditableInput
          value={value}
          editMode
          disabled
        />
        <label><b>With toggle mode</b></label>
        <ReactEditableInput
          value={value}
          toggleEditMode={this.toggleEditMode}
          changeListener={this.onEditChange}
          editMode={editMode}
        />
        <label htmlFor="ret-1"><b>With change listener</b></label>
        <ReactEditableInput
          id="ret-1"
          value={value}
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
          changeListener={this.onEditChange}
        />
        <label><b>Don't use default theme</b></label>
        <ReactEditableInput
          value={value}
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
          changeListener={this.onEditChange}
          onEditEnd={this.onEditEnd}
          useDefaultTheme={false}
        />
      </>
    );
  }
}

render(<Test />, document.getElementById('root'));
