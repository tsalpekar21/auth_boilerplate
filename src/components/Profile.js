import React from 'react'
import { getUser, updateUser } from '../actions'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.onSuccessfulProfileLoad = this.onSuccessfulProfileLoad.bind(this)
    this.onSuccessfulProfileSave = this.onSuccessfulProfileSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSuccessExit = this.handleSuccessExit.bind(this)
    this.handleDangerExit = this.handleDangerExit.bind(this)
    this.id = 0

    this.state = {
      email: 'Loading...',
      name: 'Loading...',
      errors: [],
      success: ''
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  componentDidMount() {
    getUser(this.onSuccessfulProfileLoad, (err) => { this.setState({errors: err}) } )
  }     

  onSuccessfulProfileSave() {
    this.setState({
      success: 'Successfully saved your profile.'
    }) 
  }

  onSuccessfulProfileLoad(data) {
    let email = data.email
    let name = data.name
    this.initialEmail = email
    this.initialName = name
    this.setState({
      email: email,
      name: name
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let creds = {
      email: this.refs.email.value.trim(),
      name: this.refs.name.value.trim() 
    }

    let errorArray = []
    if (creds.email === this.initialEmail && creds.name === this.initialName) {
      errorArray.push({ id: this.id, message: 'Must at least change one attribute from its original' })
      this.id = this.id + 1
    }

    if (errorArray.length > 0) this.setState({errors: errorArray})
    else updateUser(creds, this.onSuccessfulProfileSave, (err) => { this.setState({errors: err}) })
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
        <form className="form-signin"> 
          { errors.length > 0 && 
            errors.map( e => (
              <div className="alert alert-danger alert-dismissable" role="alert" key={e.id}> 
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleDangerExit}>
                  <span aria-hidden="true">&times;</span>
                </button>
                { e.message } 
              </div>  
            ))
          }

          { success && 
            <div className="alert alert-success alert-dismissable" role="alert"> 
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleSuccessExit}>
                <span aria-hidden="true">&times;</span>
              </button>
              { success } 
            </div>  
          }
          
          <h2 className="form-signin-heading">Profile</h2>
          <label className="sr-only">Name</label>
          <input type="text" ref="name" id="inputName" className="form-control" placeholder="Name" required="" autoComplete="off" 
            onChange={(e) => this.handleNameChange(e)}
            value={this.state.name} />
          <label className="sr-only">Email address</label>
          <input type="email" ref="email" id="inputEmail" className="form-control"  placeholder="Email address" required="" autoComplete="off" 
            onChange={ (e) => this.handleEmailChange(e)} 
            value={this.state.email} />
          <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit} >Save</button>
        </form>
      </div>
    );
  }
}

export default Profile;
