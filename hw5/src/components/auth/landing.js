import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="col-sm-10" id="errorMessage">{ error }</div>
        }
        { success.length == 0 ? '' :
            <div className="col-sm-10" id="successMessage">{ success }</div>
        }
    </div>
)

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.common.error, success: state.common.success }
})(ErrorMessage)

const Landing = () => (
    <div>
        
        <div class="card_index">
            <div class="container">
                <h1><b>Welcome to RiceBook</b></h1> 
            </div>
        </div>
        
        <ErrorMessage />

        <Register />

        <Login />

    </div>
)

export default Landing
