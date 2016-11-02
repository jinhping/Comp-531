import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadImage } from './profileActions'

class Avatar extends Component {

    componentDidUpdate(oldprops) {
        if (oldprops.img != this.props.img) {
            this.preview = undefined
            this.file = undefined
            this.forceUpdate()
        }
    }

 

    render() { return (
        <div>
        <h1>User Profile</h1>

        <div id="current_info">
            
            <img id="user_img" width="100%" src={this.props.img}/>
            
            <input id="add_img" type="file" accept="image/*"/>
            <br/>
            <em>Upload new picture</em>          

        </div>

        </div>
    )}
}

export default connect(
    (state) => {
        return {
            img: state.profile.avatar
        }
    }
)(Avatar)

