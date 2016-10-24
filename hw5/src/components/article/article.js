import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comment from './comment'
import ContentEditable from './contentEditable'
import { editArticle } from './articleActions'

class Article extends Component {

  constructor(props) {
    super(props)
    this.hideComments = true
    this.disabled = true
    this.addComment = false
    this.newComment = ''
  }

  render() {
    const date = moment(new Date(this.props.date))
    return (
    <div id="card_combo" name="article">
        <h3>
          <img className="followingImage" src={ this.props.avatar }/>
          {this.props.author} said
          on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
        </h3>
        
         <p>
            <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        </p>
        
        <br/>
        <p>
          <img id="postImage" src={this.props.img}/>
        </p>  

        <div className="button_article_js">
            <label className="button_articles"
              onClick={() => {
                this.hideComments = !this.hideComments
                this.forceUpdate()
              }}>
              { this.hideComments ? 'Show' : 'Hide' } Comments ({ this.props.comments.length })
            </label>
            
            &nbsp;&nbsp;&nbsp;

            
            <label className="button_articles"
              onClick={() => { this.addComment = !this.addComment; this.forceUpdate() }}>
              { this.addComment ? 'Cancel' : 'Add a comment' }
            </label>

            &nbsp;&nbsp;&nbsp;

        { this.props.author != this.props.username ? '' :
            <label className="button_articles"
              title="Click the text to edit your post"
              disabled={this.disabled}
              onClick={() => {
                this.props.dispatch(editArticle(this.props._id, this.newMessage))
                this.disabled = true
                this.forceUpdate()
              }}>
              Edit post
            </label>
        }
        </div>

        <div>
        { !this.addComment ? '' :
          <div>
              <textarea className="newPostText"
                cols="80" rows="4" placeholder="your comment"
                value={this.newComment}
                onChange={(e) => {
                  this.newComment = e.target.value
                  this.forceUpdate()
              }}>
              </textarea>
              <label className="button_articles"
                disabled={ this.newComment.length == 0 }
                onClick={() => {
                  if (this.newComment.length > 0)
                    this.props.dispatch(editArticle(this.props._id, this.newComment, -1))
                    this.newComment = ''
                    this.addComment = false
                    this.forceUpdate()
                }}>
                Make the comment
              </label>
          </div>
        }
        </div>

        { this.hideComments ? '' : this.props.comments.sort((a,b) => {
          if (a.date < b.date)
            return 1
          if (a.date > b.date)
            return -1
          return 0
        }).map((comment) =>
            <Comment key={comment.commentId} articleId={this.props._id} username={this.props.username}
              commentId={comment.commentId} author={comment.author} date={comment.date}
              text={comment.text} avatar={comment.avatar} />
        )}
    </div>
  )}
}

Article.propTypes = {
  _id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...Comment.propTypes
  }).isRequired).isRequired
}

export default connect()(Article)
