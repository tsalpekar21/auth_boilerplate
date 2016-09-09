import React from 'react'

class Success extends React.Component {
  render() {
    let { handleSuccessExit, successMessage } = this.props
    return (
      <div>
        <div className="alert alert-success alert-dismissable" role="alert"> 
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleSuccessExit}>
            <span aria-hidden="true">&times;</span>
          </button>
          { successMessage } 
        </div>  
      </div>
    )
  }
}


export default Success
