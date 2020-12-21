import { ADD } from './actionTypes'
import { ModifyAction } from './actions'
import { StoreState } from './'

const defaultState: StoreState = {
    count: 0
}

const reducer = (state: StoreState = defaultState, action: ModifyAction): StoreState => {
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