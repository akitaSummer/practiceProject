import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

import './product.less'

// 商品路由
export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/*路径完全匹配*/}
          <Route path='/product' component={ProductHome} exact/>
          <Route path='/product/addupdate' component={ProductAddUpdate} exact/>
          <Route path='/product/detail' component={ProductDetail} exact/>
          <Redirect to='/product'/>
        </Switch>
      </div>
    )
  }
}