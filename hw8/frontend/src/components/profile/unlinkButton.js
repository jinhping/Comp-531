import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { unlinkAccount } from './profileActions'

class UnlinkButton extends Component {

	render() { return (
		<div>
			{this.props.reguser.split('@')[1] ? '' :

				<div>
            		<button type="button" id="unLinkAccountBtn" onClick = {() => {this.props.dispatch(unlinkAccount())}}>UnLinking Account</button>
       			 </div>
		    }
	    </div>
	)}
}

UnlinkButton.propTypes = {
	reguser: PropTypes.string.isRequired
}

export default connect(
	(state) => {
		return {
			reguser: state.profile.username || ''
		}
	}
)(UnlinkButton)
