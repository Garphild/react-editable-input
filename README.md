Simple React component. Show editable field on text click.

## Install
`yarn add @garphild/react-editable-input`

OR

`npm install @garphild/react-editable-input --save`

## Usage

```
import React from 'react';
import ReactEditableInput from '@garphild/react-editable-input';

class View extends React {
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
          toggleEditMode={this.toggleEditMode}
          editMode={editMode}
          changeListener={this.onEditChange}
          onEditEnd={this.onEditEnd}
          disabled={false}
          fullwidth={true}
          disabled={false}
          rootContainerClass=""
          rootContainerEditClass=""
          label="Test label"
          id="test-id"
        />
      </>
    );
  }
}
```

## Props
* value (Default: '') - Current text for field.
* disabled (Default: false) - Disable edit text in input
* rootContainerClass (Default: '') - Class for root container (div)
* rootContainerEditClass (Default: '') - Additional class for root container edit mode.
* changeListener (Default: empty function) - Listener for any text changes in input field.
* onEditEnd (Default: empty function) - Fired if Enter pressed or editable field lose a focus
* editMode (Default: false) - Flag for edit or plain text mode
* toggleEditMode (Default: empty function) - Callback fired on container click
* useDefaultTheme (Default: true) - Enable/disable to use default CSS theme.
* fullwidth (Default: true) - Stretch input to container
* showLabelAlways (Default: true) - Show label for text and input or for input only  
* label (Default: '') - Label text
* id (Default: '') - HTML id property for input

## Changes
See CHANGELOG.md
* 2019-01-10 v.1.0.5
* 2019-01-10 v.1.0.4
