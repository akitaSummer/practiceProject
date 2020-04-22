import React, { useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import Title from "../../components/Title/Title";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessageContent from "../../components/MessageContent/MessageContent";
import './Chat.scss'


const ChatMessages = {
  'akitaSummer':{
    url: require('../../assets/img/v2-2.jpg'),
    messages: [
      {send: 'akitaSumer', content: 'hello world!', time: new Date(2020, 3, 20, 14, 35)},
      {send: 'user', content: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', time: new Date(2020, 3, 22, 14, 35)},
      {send: 'user', url: require('../../assets/img/v2-2.jpg'), time: new Date(2020, 3, 22, 14, 35)}
    ]
  },
  'akita':{
    url: require('../../assets/img/v2-3.jpg'),
    messages: [
      {send: 'akitaSumer', content: 'hello world!', time: new Date(2020, 3, 20, 14, 35)},
      {send: 'user', content: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', time: new Date(2020, 3, 22, 14, 35)},
    ]
  },
  'summer':{
    url: require('../../assets/img/v2-4.jpg'),
    messages: [
      {send: 'akitaSumer', content: 'hello world!', time: new Date(2020, 3, 20, 14, 35)},
      {send: 'user', content: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', time: new Date(2020, 3, 22, 14, 35)},
    ]
  },
  '面包':{
    url: require('../../assets/img/v2-5.jpg'),
    messages: [
      {send: 'akitaSumer', content: 'hello world!', time: new Date(2020, 3, 20, 14, 35)},
      {send: 'user', content: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', time: new Date(2020, 3, 22, 14, 35)},
    ]
  },
  '喵':{
    url: require('../../assets/img/v2-7.jpg'),
    messages: [
      {send: 'akitaSumer', content: 'hello world!', time: new Date(2020, 3, 20, 14, 35)},
      {send: 'user', content: '这是一个静态测试文本样例，用于测试文字颜色，字体以及省略号是否能正确显示~', time: new Date(2020, 3, 22, 14, 35)},
    ]
  },
}

const Chat = () => {

  const [menu, setMenu] = useState(false)

  const { name } = useParams();

  const history = useHistory()

  const chatContent = ChatMessages[name]

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click() {
      history.push("/chatlist");
    }
  }

  const right = {
    type: 'img',
    url: ChatMessages[name].url
  }

  return (
    <div className='chat'>
      <Title left={left} middle={name} right={right}/>
      <MessageContent menu={menu} setMenu={setMenu} chatContent={chatContent}/>
      <MessageInput menu={menu} setMenu={setMenu}/>
    </div>
  )
}

export default Chat
