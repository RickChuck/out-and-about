import React, {Component} from 'react';
require('dotenv').config();

const{REACT_APP_API_KEY}=process.env


class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this)
    }

addComment(e) {
    e.preventDefault();
    const comment = e.target.elements.comment.value.trim();
    if (comment) {
        const commentObject = {comment};
        this.props.handleAddComment(commentObject);

        const channel = {REACT_APP_API_KEY}.channel.get('comments');
        channel.publish('add_comment', commentObject, err => {
            if(err) {
                console.log('Unable to publish message; err =' + err.message);
            }
        })
        e.target.elements.comment.value = '';
    }
}

    render() {
        return (
            <div>
                <h3 className='title'>How was your adventure?</h3>
                <form onSubmit={this.addComment}>
                    <div className='field'>
                        <div className='control'>
                            <textarea className='textarea' name='comment' placeholder='Add a comment'></textarea>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <button className='button is-primary'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CommentBox;