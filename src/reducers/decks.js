import { CREATE_DECK, DELETE_DECK, GET_DECKS } from '../actions/decks'
import { CREATE_CARD } from '../actions/cards'
import { formatDeck } from '../utils/helpers'

export default function decks (state = {}, action) {
    switch(action.type) {
        case CREATE_DECK:
            const title = action.title
            return {
                ...state,
                ...formatDeck(title)
            }
        case DELETE_DECK: 
            return {
                ...state,
                decks: state.decks.filter(item => item.title !== action.title)
            }
        case GET_DECKS: 
            return {
                ...state,
                ...action.decks
            }
            case CREATE_CARD:
            return {
                ...state,
                [action.title]: { 
                    ...state[action.title],  
                    cards: state[action.title].cards.concat([{
                        question: action.question,
                        answer: action.answer
                    }])
                }
            }
        default:
            return state
    }
}