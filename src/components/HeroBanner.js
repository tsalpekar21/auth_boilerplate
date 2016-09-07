import React from 'react';
import { Link } from 'react-router'

class HeroBanner extends React.Component {
  render() {
    return (
      <div className="jumbotron"> 
        <h1>Check out all this content.</h1>
        <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
        <p>To see the difference between static and fixed top navbars, just scroll.</p>
        <p>
          <Link className="btn btn-lg btn-primary" role="button" to="signup"> Sign up </Link>
        </p>
      </div>
    );
  }
}

export default HeroBanner
