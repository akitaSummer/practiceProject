import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TodoList from './container/TodoList/TodoList'
import NotFoundPage from "./container/NotFoundPage/NotFoundPage";

function App() {
  return (
      <div className="app-container" title='dell lee' data-test='container'>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={TodoList}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
