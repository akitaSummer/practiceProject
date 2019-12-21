import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = { isShow: true }
    }

    handleChange = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() { 
        return ( 
            <div>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={2000}
                    classNames={'boss-text'}
                    unmountOnExit
                >
                    <div>Boss</div>
                </CSSTransition>
                <button onClick={this.handleChange}>show/hide</button>
            </div> 
         );
    }
}
 
export default Boss;