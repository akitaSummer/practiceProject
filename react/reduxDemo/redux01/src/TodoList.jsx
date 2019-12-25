import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
import { action, add, del } from './store/action'


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

    render() { 
        return ( 
            <div style={{margin: '10px'}}>
                <div>
                    <Input 
                        placeholder={this.state.inputValue}
                        style={{ width: '250px', marginRight: '10px'}}
                        onChange={this.changeInputValue}
                    ></Input>
                    <Button type='primary' onClick={this.clickBtn}>增加</Button>
                </div>
                <div style={{marign: '10px', width: '300px'}}>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item, i) => (<List.Item index = {i}>{item}</List.Item>)}
                        onClick={this.deleteItem}
                    ></List>
                </div>
            </div>
         );
    }
}
 
export default TodoList;