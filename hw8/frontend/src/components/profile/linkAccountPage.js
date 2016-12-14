import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { linkAccount } from './profileActions'

class LinkAccountPage extends Component {

	componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.reguser.value = null;
            this.regpw.value = null;
        }
    }

    render() { return (
        <div>
        <form onSubmit={(e) => {
            if (e) e.preventDefault()

            const payload = {
         		reguser:this.reguser.value,
                regpw:this.regpw.value
            }

            this.props.dispatch(linkAccount(payload))
        }}>

        { !this.props.reguser.split('@')[1] ? '' :


            <div>
                <h2>Link Section</h2>

                <div>
                    <input id="regUsername" type="text" placeholder="usr for regualr login" ref={(node) => this.reguser = node }/>
                </div>            
                <div>
                    <input id="regPassword" type="password" placeholder="pwd for regular login" ref={(node) => this.regpw = node }/>
                </div>
                <div>
                    <button type="submit" id="linkAccountBtn">Link Account</button>
                </div>
            </div>

        }
    	</form>
    
        </div>
    )}
}

LinkAccountPage.propTypes = {
    error: PropTypes.string.isRequired,
    reguser : PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            reguser: state.profile.username || ''
        }
    }
)(LinkAccountPage)



export { LinkAccountPage as PureLinkAccountPage }