import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { linkFB } from './profileActions'

class Link2ThirdParty extends Component {

	render() { return (

		<div>
		{ this.props.reguser.split('@')[1] ? '' :

		        <div>
		            <button type="button" id="linkfb" onClick = {() => {this.props.dispatch(linkFB())}}>Link To My Facebook</button>
		        </div>
	    }
	    </div>
	)}
}

Link2ThirdParty.propTypes = {
	reguser: PropTypes.string.isRequired
}

export default connect(
	(state) => {
		return {
			reguser: state.profile.username || ''
		}
	}
)(Link2ThirdParty)
