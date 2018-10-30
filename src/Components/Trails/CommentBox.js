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
    .then(comments => this.setState({comments: comments.data}))
}

addComment(e) {
    e.preventDefault()
    let comment= this.state.commentInput
    let trailID= this.props.trailID
   axios.post('/api/addComment', {comment, trailID})
   .then(res => {
       this.setState({comments: res.data})
   })
}

deleteComment(commentDelete) {
    const self = this
    axios.delete(this.apiComments + '/' + this.commentDelete.id).then((res) => {
        console.log(res)
        self.setState({commentDelete:commentDelete})
    })
}

handleCommentInput(e) {
    this.setState({commentInput: e.target.value})
}

    render() {
        return (
            <div className='commentBoxContainer'>
                <h3 className='title'>How was your adventure?</h3>
                <form onSubmit={this.addComment} >
                    <div className='field'>
                        <div className='control'>
                            <textarea value={this.state.commentInput} onChange={this.handleCommentInput}  placeholder='Add a comment...'></textarea>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            
                            <button type='submit' className='button is-primary'>Submit</button>
                            <button onClick={this.deleteComment} className='button is-delete'>Delete</button>
                        </div>
                    </div>
                </form>
                <div id='comments'>
                    {
                        this.state.comments.map(comment => (
                            <div key={comment.comment_id}>
                                {comment.comment}
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default CommentBox;