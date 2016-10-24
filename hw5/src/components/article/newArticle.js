import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

class NewArticle extends Component {


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
                <input type="file" id="add_img" accept="image/*" />
           
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

       
        </div>
    )}
}

export default connect()(NewArticle)

