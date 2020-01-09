/* eslint-disable prefer-template */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReactEditableInput extends Component {
  onChange = (e) => {
    const { changeListener } = this.props;
    if (changeListener) {
      changeListener(e);
    }
  };

  onToggleEditMode = () => {
    const { toggleEditMode } = this.props;
    if (toggleEditMode) {
      toggleEditMode();
    }
  };

  handleKeyPress = (event) => {
    const { onEditEnd } = this.props;
    if (event.key === 'Enter') {
      if (onEditEnd) {
        onEditEnd();
      }
    }
  };

  render() {
    const {
      rootContainerClass,
      value,
      rootContainerEditClass,
      editMode,
    } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={rootContainerClass + (editMode ? ' ' + rootContainerEditClass : '')}
        onClick={this.onToggleEditMode}
        onKeyPress={this.handleKeyPress}
      >
        {editMode && (
        <input
          type="text"
          value={value}
          onChange={this.onChange}
          onBlur={this.onEditEnd}
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
  changeListener: () => {},
  toggleEditMode: () => {},
  onEditEnd: () => {},
};

ReactEditableInput.propTypes = {
  rootContainerClass: PropTypes.string,
  rootContainerEditClass: PropTypes.string,
  changeListener: PropTypes.func,
  onEditEnd: PropTypes.func,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  toggleEditMode: PropTypes.func,
};

export default ReactEditableInput;
