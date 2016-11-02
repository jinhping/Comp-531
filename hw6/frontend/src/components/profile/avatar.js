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

     handleImageChange(e) {
        e.preventDefault()
        let reader = new FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }
        this.file = e.target.files[0];
        reader.readAsDataURL(this.file)
    }

    render() { return (
        <div>
        <h1>User Profile</h1>

        <div id="current_info">
            
            <img id="user_img" width="100%" src={this.props.img}/>
            
            <input id="add_img" type="file" accept="image/*"
                onChange={(e) => this.handleImageChange(e)}/>
            <br/>
            <em>Upload new picture</em>    

            { !this.file ? '' :
                <div>
                    <img width="100%" src={this.preview}/>
                    { this.file.webkitRelativePath || this.file.name } ({ parseInt(this.file.size / 1024 * 100)/100.0 } kB)
                    <input id="btn_update_new_picture" type="button" value="Upload" onClick={() => { this.props.dispatch(uploadImage(this.file)) }}/>
                </div>
            }      

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


