import { AsyncStorage } from 'react-native'
import { formatDeck } from './helpers'

export const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY'

export function saveDeck(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, 
        JSON.stringify(formatDeck(title)))
}

export function removeDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      const data = JSON.parse(decks)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((decks) => JSON.parse(decks))
}

export function saveCard(title, question, answer)  {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) =>  {
      const data = JSON.parse(decks)
      data[title].cards.push({question, answer})
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    });
  };