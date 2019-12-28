import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { cid: 123, title: 'blog' },
                { cid: 456, title: 'blog' },
                { cid: 789, title: 'blog' }
            ]
        }
        this.props.history.push('/home/')
    }
    render() { 
        return (
            <div>
               { /* <Redirect to='/home/'></Redirect> */}
                <ul>
                    {
                        this.state.list.map((item, i) => {
                            return (
                                <li key={i + item}>
                                    <Link to={`/list/${item.cid}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
 
export default Index;