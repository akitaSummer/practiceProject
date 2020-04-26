import React, { useEffect, useRef } from "react";
import {Link, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import titleIcon from '../../assets/image/火.png'
import user from '../../assets/img/v2-1.jpg'
import search from '../../assets/image/search.png'
import searchActive from '../../assets/image/search_active.png'
import add from '../../assets/image/add group.png'
import './SearchTitle.scss'

const SearchTitle = (props) => {

  const history = useHistory()

  const node = useRef(null)
  useEffect(() => {
    props.active && node.current.focus()
  }, [props.active])

  return (
    <div className='title'>
      <div className="title_icon">
        { props.active ? '' : <img src={titleIcon} alt='title_icon'/> }
      </div>
      <CSSTransition
        in={!props.active} // 如果this.state.show从false变为true，则动画入场，反之out出场
        timeout={500} //动画执行1秒
        classNames='fade' //自定义的class名
        unmountOnExit
      >
      <div className="title_content">
          <img src={user} alt="user" className="left" onClick={() => { history.push('/user_detail') }}/>
        <div className="right">
          <img src={search} alt="search" className="search"  onClick={() => props.setActive(true)}/>
          <Link to={`/create_group`} style={{textDecoration: 'none'}}>
            <img src={add} alt="add" className="add"/>
          </Link>
        </div>
      </div>
      </CSSTransition>
      <CSSTransition
        in={props.active} // 如果this.state.show从false变为true，则动画入场，反之out出场
        timeout={500} //动画执行1秒
        classNames='fade' //自定义的class名
        unmountOnExit
      >
        <div className="title_content">
          <div className="right">
            <div className="search_container">
              <input
                type="text"
                className={'search_active'}
                ref={node}
                value={props.searchContent}
                onChange={(e) => {props.setSearchContent(e.target.value)}}
              />
              <img src={searchActive} alt="search_active"/>
            </div>
            <span className={'cancel'} onClick={() => props.setActive(false)}>取消</span>
          </div>
        </div>
        </CSSTransition>
    </div>
  )
}

SearchTitle.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  searchContent: PropTypes.string,
  setSearchContent: PropTypes.func
}

export default SearchTitle
