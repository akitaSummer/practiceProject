import React, { Component } from 'react';

class Example3 extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 }
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentDidUpdate() {
        console.log(`componentDidUpdate${this.state.count}`)
    }

    render() { 
        return ( 
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => {this.setState({count: this.state.count + 1})}}>Click me</button>
            </div>
         );
    }
}
 
export default Example3;