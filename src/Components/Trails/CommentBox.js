import React, {Component} from 'react';
import axios from 'axios';
import './Trails.scss'
require('dotenv').config();

// const{REACT_APP_API_KEY}=process.env


class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentInput: '',
            comments: []
        }
        this.addComment = this.addComment.bind(this)
        this.handleCommentInput = this.handleCommentInput.bind(this)
        // this.deleteComment = this.deleteComment.bind(this)
    }

componentDidMount() {
    axios.get(`/api/commentList/${this.props.trailID}`)
    .then(comments => this.setState({comments: comments.data}));

   
}

addComment(e) {
    e.preventDefault()
    let comment= this.state.commentInput
    let trailID= this.props.trailID
   axios.post('/api/addComment', {comment, trailID})
   .then(res => {
       this.setState({comments: res.data, commentInput:''})
   })
}

updateComment = (id) => {
    let trail= this.props.trailID
    axios.put(`/api/updateComment`)
    .then( res => {
        this.setState({comments: res.data})
    })
}

deleteComment = (id) => {
    let trailID= this.props.trailID
    axios.delete(`/api/removeComment/${id}/${trailID}`)
    .then( res => {
       this.setState({comments: res.data})
   })
}

handleCommentInput(e) {
    this.setState({commentInput: e.target.value})
}

    render() {
        return (
            <div className='commentBoxContainer'>
                <h3 className='title'>How was your adventure?</h3>
                <form className='inputBox' onSubmit={this.addComment} >
                    <div className='field'>
                        <div className='control'>
                            <textarea value={this.state.commentInput} onChange={this.handleCommentInput}  placeholder='Add a comment...'></textarea>
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
                        this.state.comments.map(comment => (
                            <div key={comment.comment_id}>
                            <ul id='comments2'>
                                {comment.comment}
                            <button onClick={() => this.deleteComment(comment.comment_id)} className='deleteButton'>Delete</button>
                            </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default CommentBox;