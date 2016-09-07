import React from 'react'
import { createUser } from '../actions'
class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      errors: []
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
    createUser(creds, this.props.handleAuthentcation, (err) => this.setState({ errors: err.responseJSON.errors }) )
  }     

  render() {
    const { errors } = this.state
    return (
      <form className="form-signin"> 
        { errors.length > 0 && 
          errors.map( e => (
            <div className="alert alert-danger" role="alert"> { e.message } </div>  
          ))
        }
        
        <h2 className="form-signin-heading">Please sign up</h2>
        <label className="sr-only">Name</label>
        <input type="text" ref="name" id="inputName" className="form-control" placeholder="Name" required="" autoComplete="off" />
        <label className="sr-only">Email address</label>
        <input type="email" ref="email" id="inputEmail" className="form-control"  placeholder="Email address" required="" autoComplete="off" />
        <label className="sr-only">Password</label>
        <input type="password" id="inputPassword" ref="password" className="form-control" placeholder="Password" required="" autoComplete="off" />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.handleClick(e)} >Sign up</button>
      </form>
    );
  }
}

export default Signup;
