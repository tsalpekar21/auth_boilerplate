let mongoose = require('mongoose')
let Schema = mongoose.Schema
let uniqueValidator = require('mongoose-unique-validator')
let jwt = require('jsonwebtoken')
let config = require('../config')
let bcrypt = require('bcrypt')

let userSchema = new Schema({
  name: { type: String, required: [true, '\'Name\' is required.'] },
  email: { type: String, required: [true, '\'Email\' is required.'], unique: true },
  accessTokens: [{
    token: String,
    ipAddress: String,
    dateAdded: Date
  }],
  password: String,
  dateAdded: { type: Date, default: Date.now }
})

userSchema.methods.generateAuthToken = function(ip) {
  let token = jwt.sign( { id: this.id }, config.secret, {
    expiresIn: 1440 // expires in 24 minutes
  });

  if (!ip) ip = '127.0.0.1'
  console.log('IP ADDRESS: ', ip)

  let storedTokenInfo = {
    token: token,
    ipAddress: ip,
    dateAdded: Date.now()
  }

  let foundToken = false
  for (var i = 0; i < this.accessTokens.length; i++) {
    if (this.accessTokens[i].ipAddress === ip) {
      this.accessTokens[i] = storedTokenInfo
      foundToken = true
    }
  }

  if (!foundToken) this.accessTokens.push(storedTokenInfo)

  this.save()
  return token
}

userSchema.methods.removeActiveToken = function(token)  {
  for (var i = 0; i < this.accessTokens.length; i++) {
    if (this.accessTokens[i].token === token) {
      this.accessTokens.splice(i, 1)
    }
  }
  this.save()
  return true
}

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
let User = mongoose.model('User', userSchema)

module.exports = User
