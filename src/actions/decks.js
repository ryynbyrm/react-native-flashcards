export const CREATE_DECK = 'CREATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const GET_DECKS = 'GET_DECKS'

import { saveDeck, fetchDecks } from '../utils/api'

function createDeck (title) {
    return {
        type: CREATE_DECK,
        title,
    } 
}

export function handleCreateDeck(title) {
    return (dispatch) => {
        return saveDeck(title).then(() => {
            dispatch(createDeck(title))
        })
    }
}

function deleteDeck (deck) {
    return {
        type: DELETE_DECK,
        deck,
    } 
}

export function handleDeleteDeck(deck) {
    return (dispatch) => {
        return removeDeck(deck).then(() => {
            dispatch(deleteDeck(deck))
        })
    }
}


function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks,
    }
}

export function handleGetDecks() {
    return (dispatch) => {
        return fetchDecks().then((decks) => {
            dispatch(getDecks(decks))
        })
    }
}