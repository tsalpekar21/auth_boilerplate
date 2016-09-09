import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
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
    this.props.actionDispatcher.loginUser(user, this.props.handleAuthentication, this.props.handleErrors)
  }     

  render() {
    return (
      <form className="form-signin well"> 
        <h2 className="form-signin-heading text-center">Sign In</h2>
        <label htmlFor="inputEmail">Email address</label>
        <input ref="email" id="inputEmail" className="form-control"  placeholder="Email address" required="" autoComplete="off" />
        <br />
        <label htmlFor="inputPassword">Password</label>
        <input type="password" id="inputPassword" ref="password" className="form-control" placeholder="Password" required="" autoComplete="off" />
        <br />
        <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.handleClick(e)} >Login</button>
      </form>
    );
  }
}

export default Login;
