import React, { Component } from 'react';
import axios from 'axios';

export default class EachComment extends Component {
    constructor() {
        super();
        this.state = {
            editView: false,
            commentInput: ''
        }
        this.saveChanges = this.saveChanges.bind(this);
    }

    handleCommentInput(e) {
        this.setState({commentInput: e.target.value})
    }

    toggle() {
        this.setState({ editView: !this.state.editView })
    }

    saveChanges(commentID) {
        // e.preventDefault()
        let comment = this.state.commentInput
        let {trailID} = this.props
        axios.put('/api/editComment', { comment, commentID, trailID })
            .then(res => {
                this.props.updateComments(res.data)
            })
        this.toggle();
    }

    render() {
        const { comment, deleteComment } = this.props
        return (
            <div className='commentList'>
                {
                    this.state.editView ?
                        <div id='commentList'>
                            <input type='text' placeholder={comment.comment} onChange={(e) => {this.handleCommentInput(e)}} />
                            <button onClick={() => this.saveChanges(comment.comment_id)}>Save</button>
                        </div>
                        :
                        <div>
                            <p>{comment.comment}</p>
                            <button onClick={() => deleteComment(comment.comment_id)} className='deleteButton'>Delete</button>
                            <button onClick={() => this.toggle()} className='updateButton'>Edit</button>
                        </div>
                }
                {/* <p>{comment.comment}</p>
                <button onClick={() => deleteComment(comment.comment_id)} className='deleteButton'>Delete</button>
                <button onClick={() => this.toggle()} className='updateButton'>Edit</button> */}

            </div>
        )
    }
}