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
        <ReactEditableInput
          label="Always close, not editable"
          value={value}
        />
        <ReactEditableInput
          label="Always opened, not editable"
          value={value}
          editMode
        />
        <ReactEditableInput
          label="Always opened, disabled"
          value={value}
          editMode
          disabled
        />
        <ReactEditableInput
          label="With toggle mode"
          value={value}
          toggleEditMode={this.toggleEditMode}
          changeListener={this.onEditChange}
          editMode={editMode}
        />
        <ReactEditableInput
          label="With change listener"
          id="ret-1"
          value={value}
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
          changeListener={this.onEditChange}
        />
        <ReactEditableInput
          label="Don't use default theme"
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
