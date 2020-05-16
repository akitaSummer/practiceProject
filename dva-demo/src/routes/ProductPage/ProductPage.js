import React from 'react'
import { connect } from "dva";
import Product from "../../components/Product";

const ProductPage = (props) => {
  const { productList, dispatch, history } = props
  return (
    <>
      <Product history={history} dispatch={dispatch} title={'商品类型'} productList={productList}/>
    </>
  )
}

export default connect(
  (state) => ({ productList: state.product })
)(ProductPage)
