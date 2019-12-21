import React, { Component } from 'react';
import PropTypes from 'prop-types'

class SisterItem extends Component {

    static defaultProps = {
        name: 'Sister'
    }

    static propTypes = {
        content: PropTypes.string,
        index: PropTypes.number,
        deleteItem: PropTypes.func,
        name: PropTypes.string.isRequired
    }

    // 组件第一次存在dom中，函数不会被执行
    // 如果已经存在于dom中， 函数才会执行
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.content !== this.props.content) {
            return true
        } else {
           return false 
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    handleClick = () => {
        this.props.deleteItem(this.props.index)
    }

    render() { 
        return ( 
            <li onClick={this.handleClick}>{this.props.name}-{this.props.content}</li>
         );
    }
}
 
export default SisterItem;