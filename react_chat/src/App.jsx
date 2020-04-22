import React from "react";
import PropTypes from 'prop-types'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import ChatList from './pages/ChatList/ChatList'
import Chat from './pages/Chat/Chat'

const App = (props) => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path='/chatlist' render={() => <ChatList users={props.users}/>}/>
          <Route path='/chat/:name' component={<Chat/>}/>
          <Redirect from='/' to='/chatlist' />
        </Switch>
      </HashRouter>
    </>
  )
}

App.propTypes = {
  users: PropTypes.array
}

export default App
