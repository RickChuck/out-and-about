import React, { Component } from 'react';
import home2 from '../../photos/home2.png';
import star2 from '../../photos/star2.png';
import axios from 'axios';
import CommentBox from './CommentBox';
import './Trails.scss';
import {Link} from 'react-router-dom';
import User from '../User/User';
require('dotenv').config();

const{
    REACT_APP_API_KEY
}=process.env

class Trails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            isLoading: true,
            errors: null,
            userId: {}
        }
    }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(data=> {
        console.log(data)
        axios.get(`https://trailapi-trailapi.p.mashape.com/trails/explore/?lat=${data.coords.latitude}&lon=${data.coords.longitude}`, {headers: {"X-Mashape-Key": REACT_APP_API_KEY}})
        .then(res => {
            // console.log(res.data)
            this.setState({results: res.data})
        })
        .then(newData => this.setState({users: newData, store: newData}))
        .catch(error => alert(error))
      });

      axios.get(`/api/user-data`)
      .then( (res) => {
        this.setState({userId: res.data})
        console.log(res.data)
        // axios.get(`/api/commentList/${this.props.trailID}`)
        // .then(comments => this.setState({comments: comments.data}));
    })
  }
  
  createFavorite = (trail) => {
    axios.post('/api/createFavorite', trail)
    
}

  render() {
    //   console.log(this.state)
      return (
          <div id="Trails">
            <div>
                <div className='mtnBackground' alt='mtnBackground'/>
            </div>
                <div id="titleBanner">
            <h1>Out & About</h1>
                <div>
                        <button className='logout'><Link to='/'>Logout</Link></button>
                </div>
            <nav>
                <ul id="nav-wrapper">
                    <ul><Link to="/trails" component={Trails} id="home"><img style={{width:75, height:75}} src={home2} alt='home'></img>Home</Link></ul>
                    <ul><Link to="/user" component={User} id="user"><img style={{width:75, height:75}} src={star2} alt='user'></img>Favorites</Link></ul>
                </ul>
            </nav>
            </div>
            <div id="display">
            {this.state.results.data&&this.state.results.data.map((el, i) => {
                return(
                    <div id='card' key={i}>
                        <h2 id='name'>{el.name}</h2>
                        <h3 id='city'>City: {el.city}</h3>
                        <h4 id='directions'>Directions: {el.directions}</h4>
                        <p id='details'>Details: {el.description}</p>
                        <img id='thumbnail' src={el.thumbnail} alt='thumbnail'/>
                        <div id='comments'>
                         <CommentBox trailID={el.id}/>
                        </div> 
                        <div>
                        <button onClick={ () => this.createFavorite(el)} className='favoriteButton'><img style={{width:35, height:35}} src={star2} alt='favorite'/></button>
                        </div>
                    </div>
                )
            })}
        </div>
        
      </div>
    );
  }
}



export default Trails