import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//import ContentEditable from './contentEditable'
import { editArticle } from './articleActions'

class Comment extends Component {

    constructor(props) {
        super(props)        
        this.disabled = true
    }

    render() {
        const date = moment(new Date(this.props.date))
        return (
        <div>
                
                <h4>
                    <img className="followingImage" src={ this.props.avatar }/>
                    {this.props.author} commented
                    on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
                </h4>
             
             <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
 
            { this.props.username != this.props.author ? '' :
                <div>
                    <span 
                        title="Click the text to edit your comment"
                        disabled={ this.disabled }
                        onClick={() => {
                            this.props.dispatch(editArticle(this.props.articleId, this.newMessage, this.props.commentId))
                            this.disabled = true
                        }}>
                        <p><div id="update_comment_button">Update comment</div></p>
                    </span>
                </div>
            }
        </div>
    )}
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}

export default connect()(Comment)



