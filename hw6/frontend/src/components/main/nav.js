import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({username,  dispatch}) => (
      <div>
        { username.length == 0 ? '' :
          <div>
             
            <li><a href="#" id="profile"onClick={() => { dispatch(navToProfile()) }}>Edit Your Profile</a></li>
              
            <li><a href="#" id='e2elogout' onClick={() => { dispatch(logout()) }}>Log out {username} </a></li>
          </div>
        }
      </div>
    
)

export default connect(
  (state) => {
    return {
      username: state.profile.username || '',
    }
  })(Nav)