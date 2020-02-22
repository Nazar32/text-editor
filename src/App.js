import React, { Component } from 'react';
import './App.css';
import ControlPanel from './control-panel/ControlPanel';
import FileZone from './file-zone/FileZone';
import getMockText from './text.service';

class App extends Component {
  state = {
    textWords: {},
    selectionIndex: null
  };

  componentDidMount() {
    getMockText().then(text => {
      this.setState({
        textWords: this.mapTextToWords(text)
      });
    });
  }

  onSelectionChange = () => {
    this.setState({
      selectionIndex: window.getSelection().baseNode.parentElement.id
    });
  };

  applyFormatting = ({ bold, italic, underlined }) => {
    const { selectionIndex, textWords } = this.state;
    if (selectionIndex === null) {
      return;
    }
    const textWordsCopy = { ...textWords };
    const selectedWord = { ...textWordsCopy[selectionIndex] };
    if (bold === true) {
      selectedWord.formatting.bold = !selectedWord.formatting.bold;
    }
    if (italic === true) {
      selectedWord.formatting.italic = !selectedWord.formatting.italic;
    }
    if (underlined === true) {
      selectedWord.formatting.underlined = !selectedWord.formatting.underlined;
    }
    this.setState({
      textWords: textWordsCopy
    });
  };

  mapTextToWords = text => {
    const textWords = {};
    let wordOffset = 0;
    text.split(' ').forEach(word => {
      textWords[wordOffset] = {
        word,
        formatting: {
          bold: false,
          italic: false,
          underlined: false
        }
      };
      wordOffset += word.length + 1;
    });
    return textWords;
  };

  render() {
    const { textWords } = this.state;
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel applyFormatting={this.applyFormatting} />
          <FileZone
            textWords={textWords}
            onSelectionChange={this.onSelectionChange}
          />
        </main>
      </div>
    );
  }
}

export default App;
