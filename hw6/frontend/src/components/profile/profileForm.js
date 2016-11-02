import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './profileActions'

class ProfileForm extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
           // this.phone.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
          //  this.dob.value = null
        }
    }


    render() { return (

    <div>
        <form onSubmit={(e) => {
            if (e) e.preventDefault()
            const payload = {
                email:this.email.value == this.oldEmail ? '' : this.email.value,
           //     phone:this.phone.value,
                zipcode:this.zipcode.value == this.oldZipcode ? '' : this.zipcode.value,
                password:this.password.value,
                pwconf:this.pwconf.value,
            //    dob: this.dob.value
            }
            this.props.dispatch(updateProfile(payload))
            this.email.value = ''
            this.zipcode.value = ''
            this.password.value = ''
            this.pwconf.value = ''
            this.forceUpdate()
        }}>
            <div id="input">
                <h2>Update Information</h2>
                Email Address:
                <input type="email" name="Email" placeholder={this.props.oldEmail}
                        ref={(node) => this.email = node } id="email"/>
                <br/><br/>
                DOB:
                <input type="text" name="DOB" placeholder={this.props.oldDob}
                        ref={(node) => this.dob = node } id="birth"/>
                <br/><br/>
                Zipcode:
                <input type="text" id="zipcode" pattern="\d\d\d\d\d" placeholder={this.props.oldZipcode}
                        ref={(node) => this.zipcode = node }/>
                <br/><br/>
                Password:
                <input type="password" id="password" placeholder="password"
                        ref={(node) => this.password = node }/>
                <br/><br/>
                Password Confirmation:
                <input type="password" id="password2"  placeholder="password" ref={(node) => this.pwconf = node }/>
                <br/><br/>
                <div class="button">
                    <button type="submit" id="submit">Submit Changes</button>
                </div>
            </div>
        </form>
    </div>
    )}
}


ProfileForm.propTypes = {
    error: PropTypes.string.isRequired,
    oldZipcode: PropTypes.number.isRequired,
    oldEmail: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    dob:PropTypes.string.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
//            oldPhone: state.profile.phone,
            oldDob: state.profile.dob,
        }
    }
)(ProfileForm)

export { ProfileForm as PureProfileForm }
