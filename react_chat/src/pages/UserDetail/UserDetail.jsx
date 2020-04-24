import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../redux/actions'

const UserDetail = (props) => {
  useEffect(() => {
    props.getUser()
  }, [])

  return (
    <>
      {props.user.toString()}
    </>
  )
}

export default connect(
  state => {
    return {user: state.user}
  },
  {
    getUser
  }
)(UserDetail)
