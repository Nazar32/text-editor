import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {
  state = {
    selectionIndex: 0
  };

  renderWord = ([key, { word, formatting }]) => {
    let className = [];
    if (formatting.bold) {
      className.push('bold');
    }
    if (formatting.italic) {
      className.push('italic');
    }
    if (formatting.underlined) {
      className.push('underlined');
    }
    return `<span class="${className.join(' ')}" id="${key}">${word}</span>`;
  };

  render() {
    const { textWords, onSelectionChange } = this.props;
    return (
      <div id="file-zone">
        <div
          id="file"
          onMouseUp={onSelectionChange}
          dangerouslySetInnerHTML={{
            __html: Object.entries(textWords)
              .map(this.renderWord)
              .join(' ')
          }}
        />
      </div>
    );
  }
}

export default FileZone;
