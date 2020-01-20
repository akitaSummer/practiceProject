import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({ title, onFileSearch, searchEvent, onFileSearchEvent }) => {
  const [ inputActive, setInputActive ] = useState(false)
  const [ value, setValue ] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  let node = useRef(null)

  const closeSearch = () => {
    setValue('')
    onFileSearch('')
    onFileSearchEvent()
  }

  useEffect(() => {
    // const handleInputEvent = (event) => {
    //   const { keyCode } = event
    //   if (keyCode === 13 && inputActive) {
    //     onFileSearch(value)
    //   } else if (keyCode === 27 && inputActive) {
    //     closeSearch(event)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
    if (enterPressed && inputActive) {
      onFileSearch(value)
    } else if (escPressed && inputActive) {
      closeSearch()
    }
  })


  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])

  useEffect(() => {
    if (searchEvent) {
      setInputActive(true)
    } else {
      setInputActive(false)
    }
  }, [searchEvent])

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {
        !inputActive &&
        <>
          <span className='search-height'>{ title }</span>
          <button
            type='button'
            className='icon-button'
            onClick={() => { onFileSearchEvent() }}
          >
            <FontAwesomeIcon
              title='搜索'
              icon={faSearch}
              size='lg'
            ></FontAwesomeIcon>
          </button>
        </>
      }
      {
        inputActive &&
          <>
            <input
              type="text"
              className='form-control search-height'
              value={value}
              onChange={(e) => { setValue(e.target.value) }}
              ref={node}
            />
            <button
              type='button'
              className='icon-button'
              onClick={closeSearch}
            >
              <FontAwesomeIcon
                title='关闭'
                icon={faTimes}
                size='lg'
              ></FontAwesomeIcon>
            </button>
          </>
      }
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch
