import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './Pages/Login'
import Home from "./Pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/' component={Home}/>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
