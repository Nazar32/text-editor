import { runInAction, observable, decorate, action } from 'mobx';

class Store {
  synonyms = [];

  fetchSynonyms = async word => {
    const url = new URL('https://api.datamuse.com/words?ml=ocean');

    word = word.replace('.', '');

    const params = { ml: word };

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const data = await response.json();
    this.synonyms = data;
  };

  clearSynonyms = () => {
    this.synonyms = [];
  };
}

decorate(Store, {
  synonyms: observable,
  fetchSynonyms: action,
  clearSynonyms: action
});

const store = new Store();

export { store };
