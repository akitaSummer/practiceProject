import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/icon/iconfont.css'
import './Title.scss'

const Title = (props) => {

  const rightType = (right, type) => {
    switch (type) {
      case 'img':
        return (
          <div className="right_img" onClick={() => {right.click && right.click()}}>
            <img src={right.url} alt=""/>
          </div>
        )
      case 'content':
        return (
          <div className="right_icon" onClick={() => {right.click && right.click()}}>
            {right.content}
          </div>
        )
      default:
        return (
          <div className="right_icon" onClick={() => {right.click && right.click()}}>
            {right.icon ? <i className={'iconfont ' + right.icon}/> : <span className={'null'}/>}
          </div>
        )
    }
  }

  return (
    <div className='title'>
      { props.left.type === 'img' ?
        (<div className="left_img" onClick={() => {props.left.click()}}>
          <img src={props.left.url} alt=""/>
        </div>)
        :
        (<div className="left_icon" onClick={() => {props.left.click()}}>
          {props.left.icon ? <i className={'iconfont ' + props.left.icon}/> : <span className={'null'}/>}
      </div>)
      }
      <div className="middle">{ props.middle }</div>
      {
        rightType(props.right, props.right.type)
      }
    </div>
  )
}

Title.propTypes = {
  left: PropTypes.object,
  middle: PropTypes.string,
  right: PropTypes.object
}

export default Title
