import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress";
import useContextMenu from "../hooks/useContextMenu";
import { getParentNode } from '../utils/helper'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {

  const [ editStatus, setEditStatus ] = useState(false)
  const [ value, setValue ] = useState(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  let node = useRef(null)

  const clickedItem = useContextMenu([
    {
      label: '打开',
      click: () => {
        const parentElement = getParentNode(clickedItem.current, 'file-list')
        if (parentElement) {
          onFileClick(parentElement.dataset.id)
        }
      }
    },
    {
      label: '重命名',
      click: () => {
        console.log('renaming')
      }
    },
    {
      label: '删除',
      click: () => {
        console.log('deleting')
      }
    }
  ], '.file-list', [files])

  const closeSearch = (file) => {
    setEditStatus(false)
    setValue('')
    if (file.isNew) {
      onFileDelete(file.id)
    }
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
    const editItem = files.find(file => file.id === editStatus)
    if (enterPressed && editStatus && value.trim()) {
      const sameName = files.find(file => {
        return file.id !== editStatus && file.title === value
      })
      if (sameName) {
        console.log('有同名文件')
      } else {
        onSaveEdit(editItem.id, value, editItem.isNew)
        if (editItem.isNew) {
          editItem.isNew = false
        }
        setEditStatus(false)
        setValue('')
      }
    } else if (escPressed && editStatus) {
      closeSearch(editItem)
    }
  })


  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    if (newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])

  useEffect(() => {
    if (editStatus) {
      node.current.focus()
    }
  })

  return (
    <div>
      <ul className="list-group list-grout-flush file-list">
        {
          files.map(file => (
            <li
              className='list-group-item bg-light row d-flex align-items-center file-item mx-0'
              key={file.id}
              data-id={file.id}
              data-title={file.title}
            >
              {
                (file.id !== editStatus && !file.isNew) &&
                  <>
                    <span className='col-2'>
                      <FontAwesomeIcon
                        icon={faMarkdown}
                        size='lg'
                      ></FontAwesomeIcon>
                    </span>
                    <span
                      className='col-6 c-link'
                      onClick={() => { onFileClick(file.id)}}
                    >{file.title}</span>
                    <button
                      type='button'
                      className='icon-button col-2'
                      onClick={() => {
                        if (editStatus) {
                          closeSearch(files.find(file => file.id === editStatus))
                        }
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
                      className='icon-button col-2'
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
                    value={value || ''}
                    onChange={(e) => { setValue(e.target.value) }}
                    ref={node}
                    placeholder='请输入文件名'
                  />
                  <button
                    type='button'
                    className='icon-button col-2'
                    onClick={() => {closeSearch(file)}}
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
