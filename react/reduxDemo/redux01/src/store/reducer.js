import { CHANGE_INPUT, ADD, DEL, GET_LIST } from './action-type'

const defaultState = {
    inputValue: 'Write Something',
    list: [
        '早8点开会',
        '早9点开会'
    ]
}
export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case CHANGE_INPUT:
            newState.inputValue = action.value
            return newState
        case ADD:
            newState.list.push(newState.inputValue)
            newState.inputValue = 'Write Something'
            return newState
        case DEL:
            newState.list.splice(action.value, 1)
            return newState
        case GET_LIST:
            newState.list = action.defaultState
            return newState
        default:
            return state
    }
}