import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './profileActions'

class ProfileForm extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.phone.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (

    <div>
        <form onSubmit={(e) => {
            if (e) e.preventDefault()
            const payload = {
                email:this.email.value == this.oldEmail ? '' : this.email.value,
                phone:this.phone.value,
                zipcode:this.zipcode.value == this.oldZipcode ? '' : this.zipcode.value,
                password:this.password.value,
                pwconf:this.pwconf.value,
                birth: this.birth.value
            }
            this.props.dispatch(updateProfile(payload))
        }}>
            <div id="input">
                <h2>Update Information</h2>
                Email Address:
                <input type="email" name="Email" placeholder={this.props.oldEmail}
                        ref={(node) => this.email = node } id="email"/>
                <br/><br/>
                Phone number: 
                <input type="text" id="phone_number" pattern="\d\d\d-\d\d\d-\d\d\d\d" placeholder={this.props.phone}
                        ref={(node) => this.phone = node }/>
                <br/><br/>
                DOB:
                <input type="date" name="DOB" placeholder={this.props.birth}
                        ref={(node) => this.birth = node } id="birth"/>
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
                    <button type="submit" id="submit" onClick="update()">Submit Changes</button>
                </div>
            </div>
        </form>
    </div>
    )}
}


ProfileForm.propTypes = {
    error: PropTypes.string.isRequired,
    oldZipcode: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    oldEmail: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    birth: PropTypes.string.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
        }
    }
)(ProfileForm)

export { ProfileForm as PureProfileForm }
