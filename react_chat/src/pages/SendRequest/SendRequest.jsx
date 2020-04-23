import React, { useState } from "react";
import { useHistory, useParams, useLocation } from 'react-router-dom'
import Title from "../../components/Title/Title";
import './SendRequest.scss'

const SendRequest = () => {

  const [sendContent, setSendContent] = useState('亲爱的，快点来到我这里～')

  const { name } = useParams()

  const { state } = useLocation()

  const history = useHistory()

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click() {
      history.push(`/add_friend/${name}`);
    }
  }

  const right = {
    type: 'img',
    url: require('../../assets/image/more.png')
  }

  return (

    <div className='send_request'>
      <div className="back_img" style={{backgroundImage: `url(${state.url})`}}>
        <div className="back_color"></div>
      </div>
      <div className="send_request_inner">
        <Title left={left} right={right}/>
        <div className="send_request_content">
          <img src={state.url} alt="" className="send_icon"/>
          <div className="send_request_form">
            <p className="send_request_form_name">{name}</p>
            <textarea type="text" className="send_request_form_content"
                      value={sendContent}
                      onChange={(e) => {setSendContent(e.currentTarget.value)}}/>
            <div className="send_request_form_buttons">
              <button className="send_request_form_cancel" onClick={() => left.click()}>取消</button>
              <button className="send_request_form_send">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendRequest
