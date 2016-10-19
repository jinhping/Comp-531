import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from '../profile/profileActions'

class Headline extends Component {

    render() { return (
        <div>
        
            <div id="user_info">
                <img src={ this.props.avatar } id="user_img"/>
                <h2>{ this.props.username }</h2>
                <span id="status">{ this.props.headline }</span><br/>
                  
                <input id="new_status" type="text"
                        placeholder="update your headline"
                        ref={ (node) => { this.newHeadline = node }}
                        onChange={() => this.forceUpdate()} />

            { !(this.newHeadline && this.newHeadline.value.length > 0) ? '' :
                <div>
                    <input id="btn_update_user_info"
                        type="button" value="Update your Headline"
                        onClick={() => {
                            this.props.dispatch(updateHeadline(this.newHeadline.value))
                            this.newHeadline.value = ''
                        }}/>
                </div>
            }
            </div>

        </div>
    )}
}

export default connect(
    (state) => {
        return {
            username: state.profile.username,
            headline: state.profile.headline,
            avatar: state.profile.avatar
        }
    }
)(Headline)
