export const action = (value) => {
    return {
        type: 'changeInput',
        value
    }
}

export const add = () => {
    return {
        type: 'add',
        value: ''
    }
}

export const del = (value) => {
    return {
        type: 'del',
        value
    }
}