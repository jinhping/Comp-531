import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

import ProfileNav from './profileNav'



const Profile = () => {
    return (
        <div>
            <br/><br/><br/>
            <ProfileNav />
            <Avatar/>            
            <ProfileForm/>
        </div>
    )
}
export default Profile

