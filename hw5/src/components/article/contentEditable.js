import React, { Component, PropTypes } from 'react'

class ContentEditable extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div className={this.props.className}
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable={this.props.contentEditable}
            dangerouslySetInnerHTML={{__html: this.props.html}}
            title={this.props.tooltip}
        ></div>;
    }

}

ContentEditable.propTypes = {
    onChange: PropTypes.func.isRequired,
    html: PropTypes.string.isRequired
}

export default ContentEditable

