import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.scss'

import App from './App'
import Signup from './components/Signup'
import Login from './components/Login'
import HeroBanner from './components/HeroBanner'
import Profile from './components/Profile'

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={HeroBanner} />
      <Route path='/signup' components={Signup} />
      <Route path='/login' component={Login} />
      <Route path='/profile' component={Profile} />
    </Route>
  </Router>,
  document.getElementById('root')
);
