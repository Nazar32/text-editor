import React, { Component } from 'react';
import { observer, Provider, inject } from 'mobx-react';
import './App.css';
import ControlPanel from './control-panel/ControlPanel';
import FileZone from './file-zone/FileZone';
import getMockText from './text.service';
import { store } from './store';
import { SynonymPopup } from './synonym-popup/SynonymPopup';

class App extends Component {
  state = {
    textWords: {},
    selectionIndex: null,
    position: { top: null, left: null }
  };

  componentDidMount() {
    getMockText().then(text => {
      this.setState({
        textWords: this.mapTextToWords(text)
      });
    });
  }

  onSelectionChange = () => {
    const selection = window.getSelection();
    if (selection.toString() === '') {
      this.setState({
        selectionIndex: null
      });
      return;
    }
    const boundingClientRect = selection.getRangeAt(0).getBoundingClientRect();
    this.setState({
      position: {
        top: boundingClientRect.top,
        left: boundingClientRect.left
      },
      selectionIndex: selection.baseNode.parentElement.id
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

  getActiveFormatting = () => {
    const { selectionIndex, textWords } = this.state;
    if (selectionIndex === null) {
      return {};
    }
    const selectedWord = textWords[selectionIndex];
    if (!selectedWord) {
      return {};
    }
    return selectedWord.formatting;
  };

  replaceWord = newWord => {
    const { textWords, selectionIndex } = this.state;
    const textWordsCopy = { ...textWords };
    const selectedWord = { ...textWordsCopy[selectionIndex] };
    selectedWord.word = newWord;
    this.setState({
      textWords: Object.entries(textWords).reduce((acc, [key, textWord]) => {
        if (selectionIndex === key) {
          acc[key] = {
            ...textWord,
            word: newWord
          };
        } else {
          acc[key] = textWord;
        }
        return acc;
      }, {}),
      selectionIndex: null
    });
  };

  render() {
    const { textWords, selectionIndex, position } = this.state;
    const selectedWord = textWords[selectionIndex];
    const {
      store: { synonyms, fetchSynonyms, clearSynonyms }
    } = this.props;
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel
            activeFormatting={this.getActiveFormatting()}
            applyFormatting={this.applyFormatting}
          />
          <FileZone
            textWords={textWords}
            onSelectionChange={this.onSelectionChange}
          />
          <SynonymPopup
            key={selectionIndex}
            synonyms={synonyms}
            selectedWord={selectedWord && selectedWord.word}
            fetchSynonyms={fetchSynonyms}
            clearSynonyms={clearSynonyms}
            position={position}
            replaceWord={this.replaceWord}
          />
        </main>
      </div>
    );
  }
}

const ObserverApp = inject('store')(observer(App));

export default () => (
  <Provider store={store}>
    <ObserverApp />
  </Provider>
);
