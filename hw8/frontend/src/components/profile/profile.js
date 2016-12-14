import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'

import ProfileNav from './profileNav'


import ErrorMessage from '../errorMessage'
import LinkAccountPage from './linkAccountPage'
import UnlinkButton from './UnlinkButton'
import Link2ThirdParty from './Link2ThirdParty'

const Profile = () => {
    return (
        <div>
            <br/><br/><br/>
            <ProfileNav />
            <Avatar/>

            <ProfileForm/>

            <div id="linkSection">
                <LinkAccountPage/>
                <Link2ThirdParty/>

                <UnlinkButton/>
            </div>

            <ErrorMessage />

        </div>
    )
}
export default Profile

