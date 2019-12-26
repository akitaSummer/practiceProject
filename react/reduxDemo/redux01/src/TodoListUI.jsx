import React from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'

const TodoListUI = (props) => {
    return (
        <div style={{margin: '10px'}}>
        <div>
            <Input 
                placeholder={props.inputValue}
                style={{ width: '250px', marginRight: '10px'}}
                onChange={props.changeInputValue}
                value = {props.inputValue}
            ></Input>
            <Button type='primary' onClick={props.clickBtn}>增加</Button>
        </div>
        <div style={{marign: '10px', width: '300px'}}>
            <List
                bordered
                dataSource={props.list}
                renderItem={(item, i) => (<List.Item index = {i}>{item}</List.Item>)}
                onClick={props.deleteItem}
            ></List>
        </div>
    </div> 
    )
}

// class TodoListUI extends Component {
//     render() { 
//         return ( <div style={{margin: '10px'}}>
//         <div>
//             <Input 
//                 placeholder={this.props.inputValue}
//                 style={{ width: '250px', marginRight: '10px'}}
//                 onChange={this.props.changeInputValue}
//                 value = {this.props.inputValue}
//             ></Input>
//             <Button type='primary' onClick={this.props.clickBtn}>增加</Button>
//         </div>
//         <div style={{marign: '10px', width: '300px'}}>
//             <List
//                 bordered
//                 dataSource={this.props.list}
//                 renderItem={(item, i) => (<List.Item index = {i}>{item}</List.Item>)}
//                 onClick={this.props.deleteItem}
//             ></List>
//         </div>
//     </div> );
//     }
// }
 
export default TodoListUI;