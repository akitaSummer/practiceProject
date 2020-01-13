import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DogShow = () => {
  const [ url, setUrl ] = useState('')

  const style = {width: 200}

  const [ loading, setLoading ] = useState(false)

  const [ fetch, setFetch ] = useState(false)
  useEffect( () => {
    setLoading(true)
    axios.get('https://dog.ceo/api/breeds/image/random').then((result) => {
      console.log(result)
      setUrl(result.data.message)
      setLoading(false)
    })
  }, [fetch])

  return (
    <div>
      {loading ? <p>读取中</p> : <img src={url} alt="dog" style={style}/>}
      <button onClick={() => {setFetch(!fetch)}}>再看一张图片</button>
    </div>
  )
}

export default DogShow

