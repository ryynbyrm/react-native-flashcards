export const CREATE_CARD= 'CREATE_CARD'
import { saveCard } from '../utils/api'

function createCard (title, question, answer) {
    return {
        type: CREATE_CARD,
        title,
        question,
        answer
    } 
}

export function handleCreateCard(title, question, answer) {
    return (dispatch) => {
        return saveCard(title, question, answer).then(() => {
            dispatch(createCard(title, question, answer))
        })
    }
}
