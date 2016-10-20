import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({username, onProfile, dispatch}) => (
      <div>
        { username.length == 0 ? '' :
          <div>
              { onProfile ?
                <li><a href="#" onClick={() => { dispatch(navToMain()) }}>Home</a></li> :
                <li><a href="#" onClick={() => { dispatch(navToProfile()) }}>Edit Your Profile</a></li>
              }
              <li><a href="#" onClick={() => { dispatch(logout()) }}>Log out {username} </a></li>
          </div>
        }
      </div>
    
)

export default connect(
  (state) => {
    return {
      username: state.profile.username || '',
      onProfile: state.common.location == 'profile' }
  })(Nav)
