const defaultState = {
    inputValue: 'Write Something',
    list: [
        '早8点开会',
        '早9点开会'
    ]
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'changeInput':
            let newState = JSON.parse(JSON.stringify(state))
            newState.inputValue = action.value
            return newState
        case 'add':
            let addState = JSON.parse(JSON.stringify(state))
            addState.list.push(addState.inputValue)
            addState.inputValue = 'Write Something'
            return addState
        case 'del':
            let delState = JSON.parse(JSON.stringify(state))
            delState.list.splice(action.value, 1)
            return delState
        default:
            return state
    }
}