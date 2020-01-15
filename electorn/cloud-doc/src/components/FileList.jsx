import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {

  const [ editStatus, setEditStatus ] = useState(false)
  const [ value, setValue ] = useState(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const closeSearch = () => {
    setEditStatus(false)
    setValue('')
  }

  useEffect(() => {
    // const handleInputEvent = (event) => {
    //   const { keyCode } = event
    //   if (keyCode === 13 && editStatus) {
    //     const editItem = files.find(file => file.id === editStatus)
    //     onSaveEdit(editItem.id, value)
    //     setEditStatus(false)
    //     setValue('')
    //   } else if (keyCode === 27 && editStatus) {
    //     closeSearch(event)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
    if (enterPressed && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
      setValue('')
    } else if (escPressed && editStatus) {
      closeSearch()
    }
  })

  return (
    <div>
      <ul className="list-group list-grout-flush file-list">
        {
          files.map(file => (
            <li
              className='list-group-item bg-light row d-flex align-items-center file-item'
              key={file.id}
            >
              {
                (file.id !== editStatus) &&
                  <>
                    <span className='col-2'>
                      <FontAwesomeIcon
                        icon={faMarkdown}
                        size='lg'
                      ></FontAwesomeIcon>
                    </span>
                    <span
                      className='col-8 c-link'
                      onClick={() => { onFileClick(file.id)}}
                    >{file.title}</span>
                    <button
                      type='button'
                      className='icon-button col-1'
                      onClick={() => {
                        setEditStatus(file.id)
                        setValue(file.title)
                      }}
                    >
                      <FontAwesomeIcon
                        title='编辑'
                        icon={faEdit}
                        size='lg'
                      ></FontAwesomeIcon>
                    </button>
                    <button
                      type='button'
                      className='icon-button col-1'
                      onClick={() => { onFileDelete(file.id) }}
                    >
                      <FontAwesomeIcon
                        title='删除'
                        icon={faTrash}
                        size='lg'
                      ></FontAwesomeIcon>
                    </button>
                  </>
              }
              {
                (file.id === editStatus) &&
                <>
                  <input
                    type="text"
                    className='form-control search-height col-10'
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                  />
                  <button
                    type='button'
                    className='icon-button col-2'
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
            </li>
          ))
        }
      </ul>
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}

export default FileList
