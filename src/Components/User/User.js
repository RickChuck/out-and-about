import React, { Component } from 'react';
// import mountains from '../../photos/mountains.png';
import home2 from '../../photos/home2.png';
import star2 from '../../photos/star2.png';
import './User.scss'
import CommentBox from '../Trails/CommentBox';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Trails from '../Trails/Trails';

const{REACT_APP_API_KEY}=process.env

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            isLoading: true,
            errors: null
        }
    }

    componentDidMount() {
          axios.get('/api/getFavorites')
          .then(res => {
              this.setState({results: res.data})
          })
    }
   
    
    render() {
        console.log(this.state)
        return (
          <div className="User" >
            <div className="photo-banner">
             {/* <img src={mountains} class='mountain' alt='mountains'></img> */}
             </div>
             <div id="titleBanner">
            <h3 id='sub-title'>Favorite Trails</h3>
            <h1>Out & About</h1>
            
            <nav>
                <ul id="nav-wrapper">
                    <ul><Link to="/trails" component={Trails} id="home"><img style={{width:75, height:75}} src={home2} alt='home'></img>Home</Link></ul>
                    <ul><Link to="/user" component={User} id="user"><img style={{width:75, height:75}} src={star2} alt='user'></img>Favorites</Link></ul>
                </ul>
            </nav>
            </div>
            
            <div id="display">
            {this.state.results&&this.state.results.map(el => {
                return(
                    <div id='card'>
                        <h2 id='name'>{el.name}</h2>
                        <h3 id='city'>City: {el.city}</h3>
                        <h4 id='directions'>Directions: {el.directions}</h4>
                        <p id='details'>Details: {el.description}</p>
                        <img id='thumbnail' src={el.thumbnail} alt='thumbnail'/>
                        <CommentBox trailID={el.id} id='comments'/>
                        <div>
                        </div>
                    </div>
                    
                )
            })}
            </div>
            
          </div>
        );
      }
}
export default User