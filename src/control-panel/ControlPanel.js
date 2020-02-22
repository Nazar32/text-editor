import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
  applyBold = () => {
    this.props.applyFormatting({ bold: true });
  };

  applyItalic = () => {
    this.props.applyFormatting({ italic: true });
  };

  applyUnderlined = () => {
    this.props.applyFormatting({ underlined: true });
  };

  render() {
    return (
      <div id="control-panel">
        <div id="format-actions">
          <button
            className="format-action"
            type="button"
            onClick={this.applyBold}
          >
            <b>B</b>
          </button>
          <button
            className="format-action"
            type="button"
            onClick={this.applyItalic}
          >
            <i>I</i>
          </button>
          <button
            className="format-action"
            type="button"
            onClick={this.applyUnderlined}
          >
            <u>U</u>
          </button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
