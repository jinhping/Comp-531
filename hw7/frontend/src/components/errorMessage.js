import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Action, {updateError, updateSuccess} from '../actions'

const ErrorMessage = ({error, success}) => (
    <div>
        { error === '' ? '' :
            <div id="errorMessage">{ error }</div>
        }
        { success === '' ? '' :
            <div id="successMessage">{ success }</div>
        }
    </div>
)

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}


export default connect((state) => {
    return { error: state.common.error, 
            success: state.common.success 
        }
})(ErrorMessage)