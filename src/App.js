import React from 'react'
import Navbar from './components/Navbar'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleAuthentcation = this.handleAuthentcation.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = {
      isAuthenticated: false
    }
  }

  componentWillMount() {
    let token = cookie.load('accessToken')
    if (!token) this.setState({ isAuthenticated: false })
    else this.setState({ isAuthenticated: true})
  }

  handleAuthentcation(data) {
    console.log(data)
    this.setState({
      isAuthenticated: true
    })
    browserHistory.push('/profile')
  }

  handleLogout() {
    this.setState({
      isAuthenticated: false
    })
    cookie.remove('accessToken')
    browserHistory.push('/')
  }

  render() {
    return (
      <div>
        <Navbar isAuthenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}/>
        <div className="container">
          {this.props.children && React.cloneElement(this.props.children, {
              handleAuthentcation: this.handleAuthentcation,
              isAuthenticated: this.state.isAuthenticated
          })}
        </div>
      </div>
    );
  }
}

export default App;
