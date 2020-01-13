import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import DogShow from "./components/DogShow";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";

const style = {
  width: 200
}

const DogShowWithHook = () => {
  const [ data, loading ] = useURLLoader('https://dog.ceo/api/breeds/image/random')
  return (
    <div>
      {loading ? <p>读取中</p> : <img src={data && data.message} alt="dog" style={style}/>}
    </div>
  )
}

const CatShowWithHook = () => {
  const [ category, setCategory ] = useState('1')
  const [ data, loading ] = useURLLoader(`https://api.thecatapi.com/v1/images/search?limit=1&category_ids=${category}`)
  return (
    <div>
      {loading ? <p>读取中</p> : <img src={data && data[0].url} alt="cat" style={style}/>}
      <button onClick={() => { setCategory('1') }}>帽子</button>
      <button onClick={() => { setCategory('5') }}>盒子</button>
    </div>
  )
}

function App() {
  const position = useMousePosition()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{position.x}</h1>
        <DogShowWithHook></DogShowWithHook>
        <CatShowWithHook></CatShowWithHook>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LikeButton></LikeButton>
        <MouseTracker></MouseTracker>
        <DogShow></DogShow>
      </header>
    </div>
  );
}

export default App;
