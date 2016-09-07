import { browserHistory } from 'react-router'
import cookie from 'react-cookie'

function createUser(creds, successHandler, failHandler) {
  $.post('/api/users', creds)
    .done(successHandler)
    .fail(failHandler)
}

function loginUser(creds, successHandler, failHandler) {
  $.post('/api/sessions', creds)
    .done(successHandler)
    .fail(failHandler)
}

function getUser(successHandler, failHandler) {
  $.get('/api/user')
    .done(successHandler)
    .fail(redirectOnAuthFailure.bind(null, failHandler))
}

function updateUser(creds, successHandler, failHandler) {
  $.ajax({
    url: '/api/user',
    data: creds,
    type: 'PUT',
    success: successHandler,
    error: redirectOnAuthFailure.bind(null, failHandler)
  })
}

function logoutUser(successHandler, failHandler) {
  $.ajax({
    url: '/api/sessions',
    type: 'DELETE',
    success: successHandler,
    error: redirectOnAuthFailure.bind(null, failHandler)
  })
}

function redirectOnAuthFailure(cb, err) {
  if (err.status === 403 && err.responseJSON.type === 'expired') {
    cookie.remove('accessToken')
    browserHistory.pushState({ expired: true }, '/login')
  } else {
    cb(err)
  }
}

module.exports = {
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  loginUser: loginUser,
  logoutUser: logoutUser
}
