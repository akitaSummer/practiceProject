import React from "react";
import { useHistory, useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import './AddFriend.scss'

const friendMessages = {
  '面包':{
    url: require('../../assets/img/v2-5.jpg'),
    ni: 'teacher',
    readme: '夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。'
  }
}

const AddFriend = () => {

  const { name } = useParams()

  const history = useHistory()

  const left = {
    type: 'icon',
    icon: 'icon-back',
    click() {
      history.push("/chat_list");
    }
  }

  const right = {
    type: 'img',
    url: require('../../assets/image/more.png')
  }

  return (

    <div className='add_friend'>
      <div className="back_img" style={{backgroundImage: `url(${friendMessages[name].url})`}}></div>
      <div className="add_friend_inner">
        <Title left={left} right={right}/>
        <div className="add_friend_content">
          <div className="add_friend_content_top">
            <img src={friendMessages[name].url} alt="" className="add_friend_icon"/>
            <span className="add_friend_name">{name}</span>
            <span className="add_friend_ni">昵称：{friendMessages[name].ni}</span>
            <p className="add_friend_readme">{friendMessages[name].readme}</p>
          </div>
          <Link to={
            {
              pathname: `/send_request/${name}`,
              state: {
                url: friendMessages[name].url
              }
            }
          }
                style={{textDecoration: 'none'}}
          >
            <button className="add_friend_button">加为好友</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default AddFriend
