import React from 'react'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.onSuccessfulProfileLoad = this.onSuccessfulProfileLoad.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdateSuccess = this.handleUpdateSuccess.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.id = 0

    this.state = {
      email: 'Loading...',
      name: 'Loading...'
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  componentDidMount() {
    this.props.actionDispatcher.getUser(this.onSuccessfulProfileLoad, this.props.handleErrors)
  }     

  onSuccessfulProfileLoad(data) {
    let email = data.email
    let name = data.name
    this.initialEmail = email
    this.initialName = name
    this.setState({
      email: email,
      name: name,
      edit: false
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

    if (errorArray.length > 0) this.props.handleErrors(errorArray)
    else this.props.actionDispatcher.updateUser(creds, this.handleUpdateSuccess(creds), this.props.handleErrors)
  }

  handleUpdateSuccess(creds) {
    this.initialName = creds.name
    this.initialEmail = creds.email
    return (data) => {
      this.props.handleSuccess(data)
    }
  }

  toggleEdit(e) {
    e.preventDefault()
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {
    let editFields = <div>
                    <div className="col-sm-offset-3 col-xs-12 col-sm-6 text-center">
                      <label htmlFor="inputEmail">Email address</label>
                      <input type="email" ref="email" id="inputEmail" className="form-control text-center"  placeholder="Email address" required="" autoComplete="off" 
                         onChange={ (e) => this.handleEmailChange(e)} 
                         value={this.state.email} />
                    </div>
                    <div className="col-sm-offset-3 col-xs-12 col-sm-6">
                      <label htmlFor="inputName">Name</label>
                      <input type="text" ref="name" id="inputName" className="form-control text-center" placeholder="Name" required="" autoComplete="off" 
                        onChange={(e) => this.handleNameChange(e)}
                        value={this.state.name} />
                    </div>             
                </div>

    let displayFields = <div>
                    <div className="col-sm-offset-3 col-sm-6">
                      <h4> Email </h4>
                      <h4>{ this.state.email } </h4>
                    </div>             
                    <div className="col-sm-offset-3 col-sm-6 text-center">
                      <h4> Name </h4>
                      <h4> { this.state.name } </h4>
                    </div>
                    </div>

    let displayButtonText = this.state.edit ? "Show" : "Edit"
    return (
      <div className="row">
        <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          <form> 
            <div className="well profile clearfix">
                <div className="clearfix">
                  <h2 className="pull-left no-top-margin"> Profile </h2>
                  <div className="pull-right">
                    <div className="btn-group pull-right" role="group" aria-label="Basic example">
                      { this.state.edit ? <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save</button> : null }
                      <button type="button" className="btn btn-secondary" onClick={this.toggleEdit}>{displayButtonText}</button>
                    </div>
                  </div>
                </div>
                <div className="margin-bottom col-sm-12 text-center">
                  { this.state.edit ? editFields : displayFields}
                </div>
                <div className="col-xs-12 divider text-center">
                    <div className="col-xs-12 col-sm-6 emphasis">
                        <h2><strong> 20,7K </strong></h2>                    
                        <p><small>Followers</small></p>
                        <button className="btn btn-success btn-block"> Dummy Button </button>
                    </div>
                    <div className="col-xs-12 col-sm-6 emphasis">
                        <h2><strong>245</strong></h2>                    
                        <p><small>Following</small></p>
                        <button className="btn btn-info btn-block"> Dummy Button </button>
                    </div>
                </div>
            </div>      
          </form>
        </div>
      </div>
    );
  }
}


          // <form classNameName="form-signin"> 
          //   <h2 className="form-signin-heading">Profile</h2>
          //   <label className="sr-only">Name</label>
          //   <input type="text" ref="name" id="inputName" className="form-control" placeholder="Name" required="" autoComplete="off" 
          //     onChange={(e) => this.handleNameChange(e)}
          //     value={this.state.name} />
          //   <label className="sr-only">Email address</label>

          //   <button className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit} >Save</button>
          // </form>
export default Profile;
