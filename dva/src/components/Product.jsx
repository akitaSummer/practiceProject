import React, { useEffect } from 'react'
import {Button} from "antd";
import { withRouter, Link, routerRedux } from 'dva/router'
import * as api from '../services/example'

const Product = (props) => {
  const { productList } = props.productList

  const clickProductList = (e) => {
    const currentProduct = {
      name: '西瓜'
    }

    props.dispatch({
      type: "product/updateList",
      payload: currentProduct
    })
  }

  const clickProductListAsync = (e) => {
    const currentProduct = {
      name: '苹果'
    }

    props.dispatch({
      type: "product/updateListAsync",
      payload: currentProduct
    })
  }

  const clickProductListHttp = (e) => {
    props.dispatch({
      type: 'product/updateListHttp'
    })
  }

  const clickGoToHandler = (event) => {
    props.history.push('/')
  }

  const clickGoToReduxHandler = (event) => {
    props.dispatch(routerRedux.push('/'))
  }

  useEffect(() => {
    console.log(api)
    api.getProduct().then(res => {
      console.log(res)
    })
  }, [])

  return (
    <>
      <div>
        Product商品：{ props.title }
        <ul>
          {
            productList.map((element, index) => {
              return <li key={index}>{ element.name }</li>
            })
          }
        </ul>
        <Button type="primary" onClick={clickProductList}>获取商品列表</Button>
        <Button type="primary" onClick={clickProductListAsync}>获取商品列表Async</Button>
        <Button type="primary" onClick={clickProductListHttp}>获取商品列表Http</Button>
        <Button type="primary" onClick={clickGoToHandler}>去首页</Button>
        <Button type="primary" onClick={clickGoToReduxHandler}>去首页</Button>
        <Link to={'/'}>去首页</Link>

      </div>
    </>
  )
}

export default withRouter(Product)
