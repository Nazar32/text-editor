import React from 'react';
import { observer, inject } from 'mobx-react';
import './SynonymPopup.css';

const TOP_OFFSET = 20;

function SynonymPopup({
  store: { fetchSynonyms, synonyms, clearSynonyms },
  selectedWord,
  position,
  replaceWord
}) {
  React.useEffect(() => {
    if (!selectedWord) {
      clearSynonyms();
      return;
    }
    fetchSynonyms(selectedWord);
  }, [selectedWord]);

  if (!synonyms || synonyms.length === 0) {
    return null;
  }

  return (
    <div
      className="synonym-popup"
      style={{ left: position.left, top: position.top + TOP_OFFSET }}
    >
      {synonyms.map(({ word }) => (
        <div
          className="synonym-item"
          key={word}
          onClick={() => replaceWord(word)}
        >
          {word}
        </div>
      ))}
    </div>
  );
}

const ObserverSynonymPopup = inject('store')(observer(SynonymPopup));

export { ObserverSynonymPopup as SynonymPopup };
