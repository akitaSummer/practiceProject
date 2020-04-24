import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/icon/iconfont.css'
import './Title.scss'

const Title = (props) => {

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
      { props.right.type === 'img' ?
        (<div className="right_img" onClick={() => {props.right.click && props.right.click()}}>
          <img src={props.right.url} alt=""/>
        </div>)
        :
        (<div className="right_icon" onClick={() => {props.right.click && props.right.click()}}>
          {props.right.icon ? <i className={'iconfont ' + props.right.icon}/> : <span className={'null'}/>}
        </div>)
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
