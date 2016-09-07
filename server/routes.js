const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('./config')
const router = express.Router()
const User = require('./models/user')
const bcrypt = require('bcrypt')
const { marshalErrors } = require('./utils/errors')

router.get('/test', (req, res) => {
  res.send({ hey: 'you continue to make it'});
});

router.post('/users', (req, res) => {
  console.log(req.body) 
  let salt = bcrypt.genSaltSync(10)
  let passwordHash = bcrypt.hashSync(req.body.password, salt)

  let creds = { 
    email: req.body.email, 
    name: req.body.name, 
    password: passwordHash
  }

  let newUser = User(creds)

  newUser.save((err, user) => {
    if (err) {
      console.log(err.errors)
      let formattedErrors = marshalErrors(err.errors)
      res.status(400).json({ errors: formattedErrors })
    } else {
      let token = newUser.generateAuthToken()
      res.cookie('accessToken', token)
      res.status(200).json({ token: token })
    }
  })
})

router.post('/sessions', (req, res) => {
  let { email, password } = req.body
  let user = User.findOne({ email: email }, (err, foundUser) => {
    if (foundUser) {
      if (bcrypt.compareSync(password, foundUser.password)) {
        let token = foundUser.generateAuthToken(req.ip)
        res.cookie('accessToken', token)
        res.status(200).send({ message: 'Successfully logged in.'})
      } else {
        res.status(403).send({ message: 'The password you entered was invalid, try again.'})
      }
    } else {
      res.status(403).send({ message: 'There doesnt exist a user with that email in our system.'})
    }
  })
})

router.use((req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'] || req.cookies.accessToken
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.status(403).send({ 
          type: 'expired',
          message: 'Failed to authenticate token.',
           error: err 
         })    
      } else {
        User.findById(decoded.id, (err, user) => {
          if (user) {
            let isActiveToken = !!user.accessTokens.map((tok) => { if (tok.token === token) return true })
            if (isActiveToken) {
              req.user = user
              req.token = token
              next()
            } else {
              return res.status(403).json({ 
                  success: false, 
                  message: 'Invalid token' 
              })
            }
          } else {
            return res.status(403).json({ 
                success: false, 
                message: 'User doesnt exist' 
            })
          }
        })
      }
    });
  } else {

    return res.status(403).json({ 
        success: false, 
        message: 'No token provided.' 
    })
  }
})

router.get('/user', (req, res) => {
  res.status(200).json({ email: req.user.email, name: req.user.name })
})

router.put('/user', (req, res) => {
  let user = req.user
  user.email = req.body.email
  user.name = req.body.name
  user.save((err) => {
    if (err) { 
      console.log(err)
      res.status(500).send({error: err})
    } else {
      res.status(200).send({ message: 'Successfully updated user.'})
    }
  })
})

router.delete('/sessions', (req, res) => {
  let successful = req.user.removeActiveToken(req.token)
  if (successful) {
    res.status(200).json({ message: "Sucessfully logged out." })
  } else {
    res.status(500).json({ message: "There was a problem" })
  }
})

module.exports = router
