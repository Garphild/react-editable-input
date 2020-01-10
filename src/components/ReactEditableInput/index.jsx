/* eslint-disable prefer-template */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class ReactEditableInput extends Component {
  onChange = (e) => {
    const { changeListener } = this.props;
    if (changeListener) {
      changeListener(e);
    }
  };

  onToggleEditMode = () => {
    const { toggleEditMode, editMode } = this.props;
    if (toggleEditMode && !editMode) {
      toggleEditMode();
    }
  };

  handleKeyPress = (event) => {
    const { onEditEnd } = this.props;
    if (event.key === 'Enter') {
      if (onEditEnd) {
        onEditEnd(event.target.value);
      }
    }
  };

  render() {
    const {
      rootContainerClass,
      value,
      rootContainerEditClass,
      editMode,
      useDefaultTheme,
      fullwidth,
      disabled,
    } = this.props;
    const rcc = rootContainerEditClass ? ' ' + rootContainerEditClass : '';
    let defClass = (useDefaultTheme ? 'editable-input-container ' : '') + rootContainerClass;
    if (fullwidth) {
      defClass += ' editable-input-fullwidth';
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={defClass + (editMode ? rcc : '')}
        onClick={this.onToggleEditMode}
        onKeyPress={this.handleKeyPress}
      >
        {editMode && (
        <input
          type="text"
          value={value}
          onChange={this.onChange}
          onBlur={this.onEditEnd}
          disabled={disabled === true}
        />
        )}
        {!editMode && <span>{value}</span>}
      </div>
    );
  }
}

ReactEditableInput.defaultProps = {
  rootContainerClass: '',
  rootContainerEditClass: '',
  editMode: false,
  value: '',
  useDefaultTheme: true,
  fullwidth: true,
  disabled: false,
  changeListener: () => {},
  toggleEditMode: () => {},
  onEditEnd: () => {},
};

ReactEditableInput.propTypes = {
  rootContainerClass: PropTypes.string,
  rootContainerEditClass: PropTypes.string,
  changeListener: PropTypes.func,
  onEditEnd: PropTypes.func,
  value: PropTypes.string,
  editMode: PropTypes.bool,
  useDefaultTheme: PropTypes.bool,
  fullwidth: PropTypes.bool,
  disabled: PropTypes.bool,
  toggleEditMode: PropTypes.func,
};

export default ReactEditableInput;
