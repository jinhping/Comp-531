import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'


const Messages_ = ({error, success}) => (
     <div>
        { error.length == 0 ? '' :
            <div id="errorMessage">{error}</div> 
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
            <br/><br/><br/>
            <Avatar/>            
            <ProfileForm/>
            <Messages />
        </div>
    )
}
export default Profile

