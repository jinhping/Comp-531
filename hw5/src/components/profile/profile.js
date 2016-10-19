import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

const Messages_ = ({error, success}) => (
     <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div id="errorMessage">{error}</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div id="successMessage">{success}</div>
        }
    </div>
)

Messages_.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}

const Messages = connect(
    (state) => {
        return {
            error: state.common.error,
            success: state.common.success,
        }
    }
)(Messages_)

const Profile = () => {
    return (
        <div>
            <Avatar/>            
            <ProfileForm/>
            <Messages/>
        </div>
    )
}
export default Profile

