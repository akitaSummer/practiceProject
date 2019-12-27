import { ADD, INPUT_CHANGE } from './actionType'

export const inputChange = (value) => ({ type: INPUT_CHANGE, value })
export const add = (value) => ({ type: ADD, value })