import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const render = (props) => {
    const { container } = props
    ReactDOM.render(
        <React.StrictMode >
            <App / >
        </React.StrictMode>,
        container ? container.querySelector("#root") : document.getElementById('root')
    );
}


// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
    render({})
}

export const bootstrap = async(props) => {}
export const mount = async(props) => {
    render(props)
}
export const unmount = async(props) => {
    const { container } = props
    ReactDOM.unmountComponentAtNode(container.querySelector("#root"))
}
