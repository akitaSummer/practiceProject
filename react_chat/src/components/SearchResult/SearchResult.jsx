import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import './SearchResult.scss'

const SearchResult = (props) => {

  const [users, setUsers] = useState([])
  const [group, setGroup] = useState([])

  // 查找符合搜索记录得用户和群组
  useEffect(() => {
    if (props.searchContent === '') {
      setUsers(props.users.filter((item) => item.type === 'user'))
      setGroup(props.users.filter((item) => item.type === 'group'))
    } else {
      setUsers(props.users.filter((item) => item.type === 'user' && (item.name.indexOf(props.searchContent) >= 0)))
      setGroup(props.users.filter((item) => item.type === 'group' && (item.name.indexOf(props.searchContent) >= 0)))
    }
  }, [props.searchContent, props.users])

  // 将符合搜索内容的字符串进行高亮
  const transitionSearchContentStyle = (string, searchContent) => {
    const result = string.replace( new RegExp(searchContent, 'gi'), ` ${searchContent} `).split(' ').filter(item => item !== '')
    return result.map((item, i) => item === searchContent? (<span key={i} style={{color: '#4AAAFF'}}>{item}</span>) : <span key={i}>{item}</span>)
  }

  return (
    <>
      <div className="search_result">
        <div className="search_result_title">用户</div>
        {
          users.map((user, i) => {
            return (
              <div className="result_item" key={i}>
                <img src={user.url} alt="" className="icon"/>
                {
                  props.searchContent === '' ? <span className="name">{user.name}</span> : <span className="name">{transitionSearchContentStyle(user.name, props.searchContent)}</span>
                }
                {user.isFriend ? <span className="talk">发消息</span> : <span className="add">加好友</span>}
              </div>
            )
          })
        }
      </div>
      <div className="search_result">
        <div className="search_result_title">群组</div>
        {
          group.map((group, i) => {
            return (
              <div className="result_item" key={i}>
                <img src={group.url} alt="" className="icon"/>
                {
                  props.searchContent === '' ? <span className="name">{group.name}</span> : <span className="name">{transitionSearchContentStyle(group.name, props.searchContent)}</span>
                }
                {group.isFriend ? <span className="talk">发消息</span> : <span className="add">加好友</span>}
              </div>
            )
          })
        }
      </div>
    </>
  )
}

SearchResult.propTypes = {
  users: PropTypes.array,
  searchContent: PropTypes.string
}

export default SearchResult
