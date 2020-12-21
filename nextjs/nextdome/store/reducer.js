import { ADD } from './actionTypes'

const defaultState = {
    count: 0
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD:
            return {
                count: state.count + action.value
            }
        default:
            return state
    }
}

export default reducer