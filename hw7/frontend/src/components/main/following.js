import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="follower" name="follower">
        <img className="followingImage" src={ avatar }/>
        <h3><strong>{ name }</strong></h3>
        <em id="status">{ headline }</em><br/>
        <input id="unfollow_btn" type="button" value="Unfollow" onClick={() => { dispatch(delFollower(name)) }}></input>
        <br/><br/>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() { return (
            <div id ="following">
                { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                    <Follower key={follower.name}
                        name={follower.name} avatar={follower.avatar} headline={follower.headline}
                        dispatch={this.props.dispatch} />
                )}
              
                <input id="add_new_follower" type="text"
                        placeholder="add a follower"
                        ref={(node) => this.newFollower = node }
                        onChange={(e) => {
                            this.forceUpdate()
                        }}/>
                <br/><br/>

                <input id="add_follower" type="button"
                        onClick={() => {
                            this.props.dispatch(addFollower(this.newFollower.value))
                            this.newFollower.value = ''
                            this.forceUpdate()
                        }}
                        value="add follower"/>
                
                { this.props.error.length == 0 ? '' :
                    <div>
                        { this.props.error }
                    </div>
                }
            </div>

    )}
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)

