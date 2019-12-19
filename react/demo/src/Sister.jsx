import React, { Component, Fragment } from 'react'
import SisterItem from './SisterItem'
import './style.css'

class Sister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            list: ['头部按摩', '基础按摩']
        }
    }

    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    addList = () => {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        })
    }

    deleteItem = (i) => {
        const list = [...this.state.list]
        list.splice(i, 1)
        this.setState({
            list: list
        })
    }

    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor='js'>增加服务</label>
                    <input id='js' className='input' type="text" value={this.state.inputValue} onChange={this.inputChange}/>
                    <button onClick={this.addList}>增加服务</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, i) => {
                            return (
                                    <SisterItem deleteItem={this.deleteItem} key={i + item} content={item} index={i}></SisterItem>
                                )
                        })
                    }
                </ul>
            </Fragment>
        )
    }
}

export default Sister