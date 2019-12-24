import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'

const data = [
    '早8点开会',
    '早9点开会'
]

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{margin: '10px'}}>
                <div>
                    <Input placeholder='Write Something' style={{ width: '250px', marginRight: '10px'}}></Input>
                    <Button type='primary'>增加</Button>
                </div>
                <div style={{marign: '10px', width: '300px'}}>
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    ></List>
                </div>
            </div>
         );
    }
}
 
export default TodoList;