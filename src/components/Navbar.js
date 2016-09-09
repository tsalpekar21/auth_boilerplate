import React from 'react';
import { browserHistory, Link } from 'react-router'

class Navbar extends React.Component {
  constructor(props) {
    super(props) 
    this.onLogoutClick = this.onLogoutClick.bind(this)
    this.onSuccessfulLogout = this.onSuccessfulLogout.bind(this)
  }

  onLogoutClick(e) {
    e.preventDefault()
    this.props.actionDispatcher.logoutUser(this.onSuccessfulLogout, (err) => console.log(err))
  }

  onSuccessfulLogout() {
    this.props.handleAuthenticationLoss('/', 'You have successfully logged out.')
  }

  render() {
    let authButton = ( this.props.isAuthenticated ?
        <li><a href="#" onClick={this.onLogoutClick}>Logout</a></li> :
        <li><Link to="/login">Login</Link></li>
    )

    let profile = ( this.props.isAuthenticated ?
        <li><Link to="/profile">Profile</Link></li> : null )

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Authentication App</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="#about">About</a></li>
              { profile }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              { authButton }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
