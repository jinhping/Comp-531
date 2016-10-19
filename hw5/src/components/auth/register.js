import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.phone.value = null
            this.birth.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (
        
        <div>
            <h4 id="register_title"><b>Register</b></h4>
            

            <form  id="form_index" onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                    username:this.username.value,
                    email:this.email.value,
                    phone:this.phone.value,
                    birth:this.birth.value,
                    zipcode:this.zipcode.value,
                    password:this.password.value,
                    pwconf:this.pwconf.value
                }
                this.props.dispatch(register(payload))
            }}>

            Account Name:<br/>
            <input type="text" id="account_name" name="Account_Name" pattern="[A-Za-z]+[0-9A-Za-z]*"  ref={(node) => this.username = node } required/>
            <br/>
            Display Name (optional):<br/>
            <input type="text" id="display_name" name="Display_Name"/>
            <br/>
            Email Address:<br/>
            <input type="email" name="Email" placeholder="Email" ref={(node) => this.email = node} required/>
            <br/>
            Phone number:<br/>
            <input type="text" id="phone_number" name="Phone" placeholder="ddd-ddd-dddd"  pattern="\d\d\d-\d\d\d-\d\d\d\d" ref={(node) => this.phone = node} required/>
            <br/>
            Date of Birth:<br/>
            <input type="date" id="birthday" name="DOB"  ref={(node) => this.birth = node } required/>
            <br/>
            <br/>
            Zipcode: <br/>
            <input type="text" id="zipcode" name="Zipcode" placeholder="ddddd" pattern="\d\d\d\d\d" ref={(node) => this.zipcode = node} required/>
            <br/>
            Password:<br/>
            <input type="password" id="password" name="Pass" ref={(node) => this.password = node} required/>
            <br/>
            Password Confirmation:<br/>
            <input type="password" id="password_confirmation" name="PassComf" ref={(node) => this.pwconf = node }  required/>
            <br/>
            <input type="hidden" id="time_stamp" name="Time_stamp"/>
            <br/>
            <button id="btn_submit" type="submit">Register</button> 
            </form>

        </div>
    )}
}

export default connect()(Register)

