import React, { Component } from 'react';
import axios from 'axios';
import './Trails.scss';
import EachComment from './EachComment';
require('dotenv').config();

// const{REACT_APP_API_KEY}=process.env


class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentInput: '',
            comments: [],
            editView: false
        }
        this.addComment = this.addComment.bind(this)
        this.handleCommentInput = this.handleCommentInput.bind(this)
        // this.deleteComment = this.deleteComment.bind(this)
    }

    componentDidMount() {
        axios.get(`/api/commentList/${this.props.trailID}`)
            .then(comments => {
                comments.data.forEach(obj => {
                    obj.allowEdit = false
                })
                this.setState({ comments: comments.data });


            })
        }
        addComment(e) {
            e.preventDefault()
            let comment = this.state.commentInput
            let trailID = this.props.trailID
            axios.post('/api/addComment', { comment, trailID })
                .then(res => {
                    res.data.forEach(c => c.allowEdit = false)
                    this.setState({ comments: res.data, commentInput: '' })
                })
        }

        updateComments = (comments) => {
                    this.setState({ comments: comments})
                
        }

        deleteComment = (id) => {
            let trailID = this.props.trailID
            axios.delete(`/api/removeComment/${id}/${trailID}`)
                .then(res => {
                    this.setState({ comments: res.data })
                })
        }

        handleCommentInput(e) {
            this.setState({ commentInput: e.target.value })
        }

        render() {
            // console.log(this.state.comments)
            return (
                <div className='commentBoxContainer'>
                    <h3 className='title'>How was your adventure?</h3>
                    <form className='inputBox' onSubmit={this.addComment}>
                        <div className='field'>
                            <div className='control'>
                                <textarea value={this.state.commentInput} onChange={this.handleCommentInput} placeholder='Add a comment...'></textarea>
                            </div>
                        </div>
                        <div className='field'>
                            <div className='control'>

                                <button type='submit' className='submitButton'>Submit</button>
                            </div>
                        </div>
                    </form>
                    <div className='commentBox'>
                        {
                            this.state.comments.map((comment) => (
                                <EachComment comment={comment} deleteComment={this.deleteComment} trailID={this.props.trailID} updateComments={this.updateComments} key={comment.comment_id}/>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }

    export default CommentBox;