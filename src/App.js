import React from 'react'
// import logo from './logo.svg'
import './App.scss'
// import './assets/css/basc.scss'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';

function App() {
  
  return (
    <div className="App">
      <Router>

        <header className="header">
          <div className="header-contain">
            <ul>
              <li><Link to="/login">登录</Link></li>
              <li><Link to="/register">注册</Link></li>
            </ul>
          </div>
        </header>

        <div className="logo">
          <div className="logo-contain">
            <div className="logo-text"><Link to="/">LOGO设计</Link></div>
          </div>
        </div>

        <div className="content">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        </div>

      </Router>



      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
