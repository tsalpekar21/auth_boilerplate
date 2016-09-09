import React from 'react'

class Error extends React.Component {
  render() {
    let { error } = this.props
    return (
      <div>
        <div className="alert alert-danger alert-dismissable" role="alert" > 
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.handleDangerExit}>
            <span aria-hidden="true">&times;</span>
          </button>
          { error.message }
        </div>
      </div>
    )
  }
}


export default Error
