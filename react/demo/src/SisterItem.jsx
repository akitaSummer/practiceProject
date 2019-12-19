import React, { Component } from 'react';

class SisterItem extends Component {

    handleClick = () => {
        this.props.deleteItem(this.props.index)
    }

    render() { 
        return ( 
            <li onClick={this.handleClick}>{this.props.content}1</li>
         );
    }
}
 
export default SisterItem;