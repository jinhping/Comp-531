import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

class NewArticle extends Component {

    handleImageChange(e) {
        e.preventDefault()

        let reader = new window.FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }

        this.file = e.target.files[0];
        if (typeof(this.file) == 'Blob')
            reader.readAsDataURL(this.file)
    }

    render() { return (
        <div id="add_stuff">
            <div>
                    <div>Say something...</div>
                    <textarea  id="textarea"
                      cols="50" rows="4" placeholder="share what's new..."
                      value={ this.message }
                      onChange={(e) => {
                        this.message = e.target.value
                        this.forceUpdate();
                    }}>
                    </textarea>
            </div>

            <div>
                Add a picture
                <input type="file" id="add_img" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>
           
            { !this.file && !this.message ? '' :
                        <input type="button" value="Publish it"
                            onClick={() => {
                                this.props.dispatch(uploadArticle(this.message, this.file))
                                this.message = ''
                                this.file = undefined
                                this.forceUpdate()
                            }}/>
            }
            </div>

        { !this.file ? '' :
            <div>
                <img className="postImage" src={this.preview}/>
                <div>
                { this.file.webkitRelativePath || this.file.name }<br/>
                ({ parseInt(this.file.size / 1024 * 100)/100.0 } kB)
                </div>
            </div>
        }
        </div>
    )}
}

export default connect()(NewArticle)

