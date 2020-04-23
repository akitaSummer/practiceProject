import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App';

// import ReactDOM from 'react-dom';
// import { render } from '@testing-library/react';
//
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Hello world/i);
//   expect(linkElement).toBeInTheDocument();
// });
//
// test('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App/>, div)
//   // ReactDOM.unmountComponentAtNode(div)
//   const container = div.getElementsByClassName('App')
//   expect(container.length).toBe(1)
// })

Enzyme.configure({ adapter: new Adapter() })

// test('Enzyme shallow', () => {
//   // shallow是浅复制/浅渲染
//   // 适用于单元测试
//   const wapper_1 = shallow(<App/>)
//   const container_1 = wapper_1.find('[data-test="container"]')
//   // expect(wapper.find('.app-container').length).toBe(1)
//   // console.log(wapper.debug())
//   // expect(wapper.find('.app-container').prop('title')).toBe('dell lee')
//   // expect(wapper.find('[data-test="container"]').length).toBe(1)
//   expect(container_1).toExist() // 存在
//   expect(container_1).toHaveProp('title', 'dell lee') // 存在属性
//   expect(container_1).toMatchSnapshot()
//   // mount是全渲染
//   // 适合集成测试，他会将所有内容渲染
//   const wapper_2 = mount(<App/>)
//   const container_2 = wapper_2.find('[data-test="container"]')
//   expect(container_2).toExist() // 存在
//   expect(container_2).toHaveProp('title', 'dell lee') // 存在属性
// })

