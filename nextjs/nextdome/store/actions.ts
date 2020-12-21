import { ADD, ADD_TYPE } from './actionTypes'

export interface ADDAction {
    type: ADD_TYPE,
    value: number
}

export type ModifyAction = ADDAction

export const add = (value: number): ADDAction => ({ type: ADD, value })