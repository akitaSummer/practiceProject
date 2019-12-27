import { ADD, INPUT_CHANGE } from './actionType'

const defaultState = {
    inputValue: 'inputValue',
    list: [1, 2, 3]
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ADD:
            newState.list.push(action.value)
            newState.inputValue = ''
            return newState
        case INPUT_CHANGE:
            newState.inputValue = action.value
            return newState
        default:
            return state
    }
}