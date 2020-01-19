import React, { useState } from 'react';
import './App.css';
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import defaultFiles from "./utils/defaultFiles";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import uuidv4 from 'uuid/v4'
import { flattenArr, objToArr } from './utils/helper'
import fileHelper from "./utils/fileHelper";

const { join } = window.require('path')
const { remote } = window.require('electron')
const Store = window.require('electron-store')
const fileStore = new Store({ 'name': 'Files Data' })

const saveFilesToStore = (files) => {
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, title, path, createdAt } = file
    result[id] = {
      id,
      title,
      path,
      createdAt
    }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}

function App() {

  const [ files, setFiles ] = useState(fileStore.get('files') || {})
  const [ activeFileID, setActiveFileID ] = useState('')
  const [ openFilesIDs, setOpenFileIDs ] = useState([])
  const [ unsaveFilesIDs, setUnsaveFilesIDs ] = useState([])
  const [ searchFiles, setSearchFiles ] = useState([])
  const filesArr = objToArr(files)
  const savedLocation = remote.app.getPath('documents')

  const openedFiles = openFilesIDs.map(openID => {
    return files[openID]
  })

  const noFile = (id) => {
    window.alert('文件搜索不到')
    const newFiles = { ...files }
    delete newFiles[id]
    saveFilesToStore(newFiles)
    setFiles(newFiles)
  }

  const activeFile = files[activeFileID]

  const updateNewFiles = (id, key, value) => {
    const newFile = {
      ...files[id],
      [key]: value
    }
    return { ...files, [id]: newFile}
  }

  const fileClick = (id) => {
    setActiveFileID(id)
    const currentFile = files[id]
    if (!currentFile.isLoaded) {
      fileHelper.readFile(currentFile.path).then((value) => {
        const newFile = {
          ...currentFile,
          isLoaded: true,
          body: value
        }
        setFiles({ ...files, [id]: newFile })
      }).catch(() => {
        noFile(id)
      })
    }
    if (!openFilesIDs.includes(id)) {
      setOpenFileIDs([...openFilesIDs, id])
    }
  }

  const tabClick = (id) => {
    setActiveFileID(id)
  }

  const tabClose = (id) => {
    const tabWithout = openFilesIDs.filter(openID => {
      return openID !== id
    })
    setOpenFileIDs(tabWithout)
    if (tabWithout.length > 0) {
      setActiveFileID(tabWithout[tabWithout.length - 1])
    } else {
      setActiveFileID('')
    }
  }

  const fileChange = (id, value) => {
    if (!unsaveFilesIDs.includes(id)) {
      setUnsaveFilesIDs([...unsaveFilesIDs, id])
    }
    const newFiles = updateNewFiles(id, 'body', value)
    setFiles(newFiles)
  }

  const fileDelete = (id) => {
    if (!files[id].path) {
      const { [id]: value, ...afterDelete } = files
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path).then(() => {
        const newFiles = {...files}
        delete newFiles[id]
        setFiles(newFiles)
        tabClose(id)
      }).catch(() => {
        noFile(id)
      })
    }
  }

  const saveEdit = (id, title, isNew, ) => {
    const newPath = join(savedLocation, `${title}.md`)
    const modifiedFile = { ...files[id], path: newPath, isNew: false, title }
    const newFiles = { ...files, [id]: modifiedFile }
    if (isNew) {
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      }).catch(() => {
        noFile(id)
      })
    } else {
      fileHelper.renameFile(join(savedLocation, `${files[id].title}.md`), newPath).then(() => {
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      }).catch(() => {
        noFile(id)
      })
    }
  }

  const saveCurrentFile = () => {
    fileHelper.writeFile(join(savedLocation, `${activeFile}.md`), activeFile.body).then(
      setUnsaveFilesIDs(unsaveFilesIDs.filter(id => id !== activeFile.id))
    )
  }

  const fileSearch = (keyword) => {
    const newFiles = files.filter((file) => {
      return file.title.includes(keyword)
    })
    setSearchFiles(newFiles)
  }

  const addFile = () => {
    const id = uuidv4()
    const newFiles = {
      ...files,
      [id]: {
        id,
        title: '',
        body: '##请在这里书写Markdown',
        createAt: new Date().getTime(),
        isNew: true
      }
    }
    setFiles(newFiles)
  }

  const showFiles = searchFiles.length > 0 ? searchFiles : filesArr

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            title='我的云文档'
            onFileSearch={fileSearch}
          ></FileSearch>
          <FileList
            files={showFiles}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={saveEdit}
          ></FileList>
          <div className="row no-gutters button-group no-border">
            <div className="col">
              <BottomBtn
                text='新建'
                colorClass='btn-primary'
                icon={faPlus}
                onBtnClick={addFile}
              ></BottomBtn>
            </div>
            <div className="col">
              <BottomBtn
                text='导入'
                colorClass='btn-success'
                icon={faFileImport}
              ></BottomBtn>
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {
            activeFile ?
              <>
                <TabList
                  files={openedFiles}
                  activeId={activeFileID}
                  unsaveIds={unsaveFilesIDs}
                  onTabClick={tabClick}
                  onCloseTab={tabClose}
                ></TabList>
                <SimpleMDE
                  key={activeFile && activeFile.id}
                  value={activeFile && activeFile.body}
                  onChange={(value) => {fileChange(activeFile.id, value)}}
                  options={{
                    minHeight: '515px'
                  }}
                ></SimpleMDE>
                <BottomBtn
                  text='保存'
                  colorClass='btn-success'
                  icon={faSave}
                  onBtnClick={saveCurrentFile}
                ></BottomBtn>
              </>
              :
              <div className='start-page'>
                选择或者创建新的 Markdown 文档
              </div>
          }

        </div>
      </div>
    </div>
  );
}

export default App;
