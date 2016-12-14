import React from 'react'
import { connect } from 'react-redux'

import { localLogin, facebookLogin } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    return (
        <div>
            <h4><b>Login</b></h4>
            
            <div id="index_login" action="main.html">
                Account Name:<br/>
                <input type="text" id="account_name_login" name="Account_Name" placeholder="Required" ref={(node) => { username = node }} />
                <br/>
                Password Confirmation:<br/>
                <input type="password" id="password_login" name="PassComf" placeholder="Required"  ref={(node) => { password = node }}/>
                <br/>
                <input id="landing_login_button" type="button" value="Log In"
                onClick={() => {dispatch(localLogin(username.value, password.value))}}/>
                <br/>
                <br/>
                <input id="fbLogin" type="button" value="Login Via Facebook" onClick = {() => {dispatch(facebookLogin())}}/>

            </div>
            

  </div>
    )
}

export default connect()(Login)

