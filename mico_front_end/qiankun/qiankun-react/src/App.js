import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename='/react'>
      <Link to=''>Home</Link>
      <Link to='/about'>About</Link>
      <Route path='/' exact render={() => (
         <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className='App-link'
              href='https://reactjs.org'
              target='_blank'
              rel='noopener noreferrer'>
              Learn React
            </a>
          </header>
        </div> 
      )}/>
      <Route path='/about' exact render={() => <h1>about</h1>}/>
    </BrowserRouter>
  );
}

export default App;
