import React from 'react'
import Navbar from './components/Navbar'
import Error from './components/messages/Error'
import Success from './components/messages/Success'
import cookie from 'react-cookie'
import ActionDispatcher from './actions'

import { browserHistory } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleAuthenticationLoss = this.handleAuthenticationLoss.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.handleDangerExit = this.handleDangerExit.bind(this)
    this.handleSuccessExit = this.handleSuccessExit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
    this.actionDispatcher = new ActionDispatcher(this)

    this.state = {
      isAuthenticated: false,
      errors: [],
      success: ''
    }
  }

  componentWillMount() {
    let token = cookie.load('accessToken')
    if (!token) this.setState({ isAuthenticated: false })
    else this.setState({ isAuthenticated: true})
  }

  handleAuthentication(data) {
    this.setState({
      isAuthenticated: true,
      success: data.message
    })
    browserHistory.push('/profile')
  }

  handleAuthenticationLoss(path, message) {
    let state = {}
    if (message) state['success'] = message
    state['isAuthenticated'] = false
    this.setState(state)
    cookie.remove('accessToken')
    browserHistory.push(path)
  }

  redirectOnAuthFailure(cb, err) {
    if (err.status === 403 && err.responseJSON.type === 'expired') {
      cookie.remove('accessToken')
      browserHistory.push('/login')
      this.setState({
        isAuthenticated: false,
        errors: [{ id: 'expiration', message: 'Session expired. Please login again.' }]
      })
    } else {
      cb(err)
    }
  }

  handleErrors(err) {
    if (err && err.responseJSON) err = err.responseJSON
    if (!(Object.prototype.toString.call(err) === '[object Array]')) err = [err]
    this.setState({
      errors: err
    })
  }

  handleSuccess(data) {
    this.setState({
      success: data.message
    })
  }

  handleSuccessExit(_) {
    this.setState({ success: '' })
  }

  handleDangerExit(_) {
    this.setState({ errors: [] })
  }

  render() {
    let { errors, success } = this.state
    return (
      <div>
        <Navbar isAuthenticated={this.state.isAuthenticated} 
                handleAuthenticationLoss={this.handleAuthenticationLoss}
                actionDispatcher={this.actionDispatcher} />

        <div className="container">
          { errors.length > 0 && 
            errors.map( e => (
              <Error handleDangerExit={this.handleDangerExit} 
                     error={e} 
                     key={e.id} />
            ))
          }

          { success && 
            <Success handleSuccessExit={this.handleSuccessExit} 
                     successMessage={success} />
          }

          {this.props.children && React.cloneElement(this.props.children, {
              handleAuthenticationLoss: this.handleAuthenticationLoss,
              handleAuthentication: this.handleAuthentication,
              isAuthenticated: this.state.isAuthenticated,
              handleErrors: this.handleErrors,
              handleSuccess: this.handleSuccess,
              actionDispatcher: this.actionDispatcher
          })}
        </div>
      </div>
    );
  }
}

export default App;
