import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  handleClick(event) {
    event.preventDefault()
    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()
    const name = this.refs.name.value.trim()

    const creds = { 
      email: email,
      password: password,
      name: name
    }

    this.props.actionDispatcher.createUser(creds, this.props.handleAuthentication, this.props.handleErrors)
  }     

  render() {
    return (
      <form className="form-signin well"> 
        <h2 className="form-signin-heading text-center">Sign Up</h2>
        <label htmlFor="inputName">Name</label>
        <input type="text" ref="name" id="inputName" className="form-control" placeholder="Name" required="" autoComplete="off" />
        <br />
        <label htmlFor="inputEmail">Email address</label>
        <input type="email" ref="email" id="inputEmail" className="form-control"  placeholder="Email address" required="" autoComplete="off" />
        <br />
        <label htmlFor="inputPassword">Password</label>
        <input type="password" id="inputPassword" ref="password" className="form-control" placeholder="Password" required="" autoComplete="off" />
        <br />
        <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.handleClick(e)} >Sign up</button>
      </form>
    );
  }
}

export default Signup;
