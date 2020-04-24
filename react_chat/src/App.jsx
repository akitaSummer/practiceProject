import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { getUserList } from "./redux/actions";
import ChatList from './pages/ChatList/ChatList'
import Chat from './pages/Chat/Chat'
import AddFriend from './pages/AddFriend/AddFriend'
import SendRequest from './pages/SendRequest/SendRequest'
import UserDetail from './pages/UserDetail/UserDetail'

const App = (props) => {

  useEffect(() => {
    props.getUserList()
  }, [])

  return (
    <>
      <HashRouter>
        <Switch>
          <Route path='/chat_list' render={() => <ChatList users={props.users}/>}/>
          <Route path='/chat/:name' component={(props) => <Chat {...props}/>}/>
          <Route path='/add_friend/:name' component={(props) => <AddFriend {...props}/>}/>
          <Route path='/send_request/:name' component={(props) => <SendRequest {...props}/>}/>
          <Route path='/user_detail' component={(props) => <UserDetail {...props}/>}/>
          <Redirect from='/' to='/chat_list' />
        </Switch>
      </HashRouter>
    </>
  )
}

App.propTypes = {
  users: PropTypes.array
}

export default connect(
  state => ({ users: state.userList }),
  {
    getUserList
  }
)(App)
