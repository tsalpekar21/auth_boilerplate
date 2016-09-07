import React from 'react'
import { loginUser } from '../actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    let priorState = props.location.state
    let errorArray = []

    if (priorState && priorState.expired) {
      errorArray.push({message: 'Session expired, please login again'})
    }

    this.state = {
      email: '',
      password: '',
      errors: errorArray
    }
  }

  handleClick(event) {
    event.preventDefault()
    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()
    const user = { 
      email: email,
      password: password
    }
    loginUser(user, this.props.handleAuthentcation, (err) => { this.setState({ errors: [err.responseJSON] }) })
  }     

  render() {
    return (
      <form className="form-signin"> 
        { this.state.errors.length > 0 && 
          this.state.errors.map( e => (
            <div className="alert alert-danger" role="alert"> { e.message } </div>  
          ))
        }
        
        <h2 className="form-signin-heading">Please sign in</h2>
        <label className="sr-only">Email address</label>
        <input ref="email" id="inputEmail" className="form-control"  placeholder="Email address" required="" autoComplete="off" />
        <label className="sr-only">Password</label>
        <input type="password" id="inputPassword" ref="password" className="form-control" placeholder="Password" required="" autoComplete="off" />
        <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.handleClick(e)} >Login</button>
      </form>
    );
  }
}

export default Login;
