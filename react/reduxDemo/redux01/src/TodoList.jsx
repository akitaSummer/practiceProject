import React, { Component } from 'react';
import store from './store'
import { action, add, del, getMyListAction } from './store/action'
import TodoListUI from './TodoListUI'


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        store.subscribe(this.storeChange)
    }

    changeInputValue = (event) => {
        const result = action(event.target.value)
        store.dispatch(result)
    }

    clickBtn = () => {
        const result = add()
        store.dispatch(result)
    }

    deleteItem = (event) => {
        const result = del(event.target.getAttribute('index'))
        store.dispatch(result)
    }

    storeChange = () =>  {
        this.setState(store.getState())
    }

    componentDidMount() {
        // const action = getTodoList()
        // store.dispatch(action)
        const action = getMyListAction()
        store.dispatch(action)
    }

    render() { 
        return ( 
            <TodoListUI
                inputValue = {this.state.inputValue}
                changeInputValue = {this.changeInputValue}
                clickBtn = { this.clickBtn}
                list = {this.state.list}
                deleteItem = {this.deleteItem}
            ></TodoListUI>
         );
    }
}
 
export default TodoList;