import React, { useState } from 'react'
import SearchTitle from "./components/SearchTitle/SearchTitle";
import SearchResult from "./components/SearchResult/SearchResult";
import UserMessageOutline from "./components/UserMessageOutline/UserMessageOutline";
import ReactPullLoad, { STATS } from "react-pullload";
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import './reset.css'
import "react-pullload/dist/ReactPullLoad.css";


const App = (props) => {

  const [hasMore, setHasMore] = useState(true)
  const [action, setAction] = useState(STATS.init)
  const [searchActive, setSearchActive] = useState(false)
  const [searchContent, setSearchContent] = useState('')

  const handRefreshing = () => {
    if (STATS.refreshing === action) {
      return false;
    }

    setTimeout(() => {
      //refreshing complete
      setHasMore(true)
      setAction(STATS.refreshed)
    }, 3000);

    setAction(STATS.refreshing)
  };

  const handleAction = actionType => {
    //new action must do not equel to old action
    if (actionType === action) {
      return false;
    }

    if (actionType === STATS.refreshing) {
      //刷新
      handRefreshing();
    } else if (actionType === STATS.loading) {
      //加载更多
      // this.handLoadMore();
    } else {
      //DO NOT modify below code
      setAction(actionType)
    }
  };

  return (
    <div className='container'>
      <SearchTitle active={searchActive} setActive={setSearchActive} searchContent={searchContent} setSearchContent={setSearchContent}/>
      <div className="user_message_outlines">
        <CSSTransition
          in={!searchActive}
          timeout={500}
          classNames='fade'
          unmountOnExit
        >
          <ReactPullLoad
            downEnough={150}
            action={action}
            handleAction={handleAction}
            hasMore={hasMore}
            distanceBottom={1000}
            style={{height: '100%'}}
          >
            {props.users.map((user, i) => {
              return <UserMessageOutline user={user} key={i}/>
            })}
          </ReactPullLoad>
        </CSSTransition>
        <CSSTransition
          in={searchActive}
          timeout={500}
          classNames='fade'
          unmountOnExit
        >
          <SearchResult users={props.users} searchContent={searchContent}></SearchResult>
        </CSSTransition>
      </div>
    </div>
  )
}

App.propTypes = {
  user: PropTypes.array
}


export default App
