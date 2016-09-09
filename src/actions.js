import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
import $ from 'jquery'

class ActionDispatcher {

  constructor(App) {
    this.app = App
  }

  createUser(creds, successHandler, failHandler) {
    $.post('/api/users', creds)
      .done(successHandler)
      .fail(failHandler)
  }

  loginUser(creds, successHandler, failHandler) {
    $.post('/api/sessions', creds)
      .done(successHandler)
      .fail(failHandler)
  }

  getUser(successHandler, failHandler) {
    $.get('/api/user')
      .done(successHandler)
      .fail(this.app.redirectOnAuthFailure.bind(this.app, failHandler))
  }

  updateUser(creds, successHandler, failHandler) {
    $.ajax({
      url: '/api/user',
      data: creds,
      type: 'PUT',
      success: successHandler,
      error: this.app.redirectOnAuthFailure.bind(this.app, failHandler)
    })
  }

  logoutUser(successHandler, failHandler) {
    $.ajax({
      url: '/api/sessions',
      type: 'DELETE',
      success: successHandler,
      error: this.app.redirectOnAuthFailure.bind(this.app, failHandler)
    })
  }

}


export default ActionDispatcher
