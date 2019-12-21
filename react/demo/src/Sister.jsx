import React, { Component, Fragment } from 'react'
import axios from 'axios'
import SisterItem from './SisterItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './style.css'

class Sister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            list: ['头部按摩', '基础按摩']
        }
    }

    inputChange = () => {
        this.setState({
            inputValue: this.input.value
        })
    }

    addList = () => {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        }, () => { // 虚拟DOM渲染完毕后执行
            console.log(this.ul.querySelectorAll('li').length)
        })
    }

    deleteItem = (i) => {
        const list = [...this.state.list]
        list.splice(i, 1)
        this.setState({
            list: list
        })
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda')
        .then((res) => {
            console.log(JSON.stringify(res))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    render() {
        console.log('render')
        return (
            <Fragment>
                <div>
                    <label htmlFor='js'>增加服务</label>
                    <input
                        id='js' 
                        className='input' 
                        type="text" 
                        value={this.state.inputValue} 
                        onChange={this.inputChange}
                        ref={(input) => { this.input = input }}
                    />
                    <button onClick={this.addList}>增加服务</button>
                </div>
                <ul ref={(ul) => { this.ul = ul }}>
                    <TransitionGroup>
                        {
                            this.state.list.map((item, i) => {
                                return (
                                    <CSSTransition
                                        timeout={2000}
                                        classNames="boss-text"
                                        unmountOnExit
                                        key={i + item}
                                        appear={true}
                                    >
                                        <SisterItem 
                                                deleteItem={this.deleteItem} 
                                                key={i + item} 
                                                content={item} 
                                                index={i}
                                                list={this.state.list}
                                            ></SisterItem>
                                    </CSSTransition>
                                    )
                            })
                        }
                    </TransitionGroup> 
                </ul>
            </Fragment>
        )
    }
}

export default Sister