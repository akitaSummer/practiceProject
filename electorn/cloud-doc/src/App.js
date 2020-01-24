import React, { useState } from 'react';
import './App.css';
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import Loader from "./components/Loader";
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import uuidv4 from 'uuid/v4'
import { flattenArr, objToArr, timestampToString } from './utils/helper'
import fileHelper from "./utils/fileHelper";
import useIpcrenderer from "./hooks/useIpcRenderer";

const { join, basename, extname, dirname } = window.require('path')
const { remote, ipcRenderer } = window.require('electron')
const Store = window.require('electron-store')
const fileStore = new Store({ 'name': 'Files Data' })
const settingsStore = new Store({ 'name': 'settings' })

const qiniuConfig = () => ['#accessKey', '#secretKey', "#bucketName", 'enableAutoSync'].every(item => !!settingsStore.get(item))

const saveFilesToStore = (files) => {
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, title, path, createdAt, isSynced, updatedAt } = file
    result[id] = {
      id,
      title,
      path,
      createdAt,
      isSynced,
      updatedAt
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
  const [ searchEvent, setSearchEvent ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const filesArr = objToArr(files)
  const savedLocation = settingsStore.get('saveLocation') || remote.app.getPath('documents')

  const showFiles = searchFiles.length > 0 ? searchFiles : filesArr
  const activeFile = files[activeFileID]
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
    const { title, path, isLoaded } = currentFile
    if (!isLoaded) {
      if (settingsStore.get('enableAutoSync')) {
        ipcRenderer.send('download-file', { key: `${title}.md`, id, path})
      } else {
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
    if (value !== files[id].body) {
      if (!unsaveFilesIDs.includes(id)) {
        setUnsaveFilesIDs([...unsaveFilesIDs, id])
      }
      const newFiles = updateNewFiles(id, 'body', value)
      setFiles(newFiles)
    }
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

  const saveEdit = (id, title, isNew) => {
    const newPath = isNew ? join(savedLocation, `${title}.md`) : join(dirname(files[id].path), `${title}.md`)
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
      fileHelper.renameFile(files[id].path, newPath).then(() => {
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      }).catch(() => {
        noFile(id)
      })
    }
  }

  const saveCurrentFile = () => {
    const { path, body, title } = activeFile
    fileHelper.writeFile(path, body).then(() => {
      setUnsaveFilesIDs(unsaveFilesIDs.filter(id => id !== activeFile.id))
      if (qiniuConfig) {
        ipcRenderer.send('upload-file', {
          key: `${title}.md`,
          path
        })
      }
    })
  }

  const fileSearch = (keyword) => {
    const filesArr = objToArr(files)
    const newFilesArr = filesArr.filter((file) => {
      return file.title.includes(keyword)
    })
    setSearchFiles(newFilesArr)
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

  const fileImport = () => {
    remote.dialog.showOpenDialog({
      title: '选择导入的 Markdown 文件',
      properties: ['openFile', 'multiSelections'],
      filters: [
        {name: 'Markdown files', extensions: ['md']}
      ]
    }).then(({ canceled, filePaths }) => {
      if (!canceled) {
        const fileFinderPath = filePaths.filter(path => {
          return !Object.values(files).find(file => {
            return file.path === path
          })
        })
        const importFilesArr = fileFinderPath.map(path => {
          return {
            id: uuidv4(),
            title: basename(path, extname(path)),
            path
          }
        })
        const newFiles = {
          ...files,
          ...flattenArr(importFilesArr)
        }
        setFiles(newFiles)
        saveFilesToStore(newFiles)
        if (importFilesArr.length > 0) {
          remote.dialog.showMessageBox({
            type: 'info',
            title: `成功导入了${importFilesArr.length}个文件`,
            message: `成功导入了${importFilesArr.length}个文件`
          })
        }
      }
    })
  }

  const fileSearchEvent = () => {
    setSearchEvent(!searchEvent)
  }

  const activeFileUploaded = () => {
    const { id } = activeFile
    const modifiedFile = { ...files[id], isSynced: true, updatedAt: new Date().getTime()}
    const newFiles = { ...files, [id]: modifiedFile }
    setFiles(newFiles)
    saveFilesToStore(newFiles)
  }

  const activeFileDownloaded = (event, message) => {
    const currentFile = files[message.id]
    const { id, path } = currentFile
    fileHelper.readFile(path).then(value => {
      let newFile
      if (message.status === 'download-success') {
        newFile = { ...files[id], body: value, isLoaded: true, isSynced: true, updatedAt: new Date().getTime() }
      } else {
        newFile = { ...files[id], body: value, isLoaded: true }
      }
      const newFiles = { ...files, [id]: newFile }
      setFiles(newFiles)
      saveFilesToStore(newFiles)
    })
  }

  const filesUploaded = () => {
    const newFiles = objToArr(files).reduce((result, file) => {
      const currentTime = new Date().getTime()
      result[file.id] = {
        ...files[file.id],
        isSynced: true,
        updatedAt: currentTime
      }
    }, {})
    setFiles(newFiles)
    saveFilesToStore(newFiles)
  }

  useIpcrenderer({
    'create-new-file': addFile,
    'import-file': fileImport,
    'save-edit-file': saveCurrentFile,
    'search-file': fileSearchEvent,
    'active-file-uploaded': activeFileUploaded,
    'file-downloaded': activeFileDownloaded,
    'loading-status': (message, status) => {
      setIsLoading(status)
    },
    'files-uploaded': filesUploaded
  })

  return (
    <div className="App container-fluid px-0">
      {
        isLoading && <Loader></Loader>
      }
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            title='我的云文档'
            onFileSearch={fileSearch}
            searchEvent={searchEvent}
            onFileSearchEvent={fileSearchEvent}
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
                onBtnClick={fileImport}
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
                { activeFile.isSynced && <span className="sync-status">已同步，上次同步{timestampToString(activeFile.updatedAt)}</span>}
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
