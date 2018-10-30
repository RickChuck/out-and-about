import React, { Component } from 'react';
// import mountains from '../../photos/mountains.png';
import home2 from '../../photos/home2.png';
import star2 from '../../photos/star2.png';
import './User.scss'
import CommentBox from '../Trails/CommentBox';
import axios from 'axios';

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
        navigator.geolocation.getCurrentPosition(data=> {
          console.log(data)
          axios.get(`https://trailapi-trailapi.p.mashape.com/trails/explore/?lat=${data.coords.latitude}&lon=${data.coords.longitude}`, {headers: {"X-Mashape-Key": REACT_APP_API_KEY}})
          .then(res => {
              this.setState({results: res.data})
          })
          .then(newData => this.setState({users: newData, store: newData}))
          .catch(error => alert(error))
        })
    }
    
    render() {
        return (
          <div className="User" >
            <div class="photo-banner">
             {/* <img src={mountains} class='mountain' alt='mountains'></img> */}
             </div>
             <div id="titleBanner">
            <h1>Out & About</h1>
            <h3 id='sub-title'>Favorite Trails</h3>
            <nav>
                <ul id="nav-wrapper">
                    <ul><a href="!#/trails" id="home"><img style={{width:75, height:75}} src={home2} alt='home'></img>Home</a></ul>
                    <ul><a href="!#/user" id="user"><img style={{width:75, height:75}} src={star2} alt='user'></img>Favorites</a></ul>
                </ul>
            </nav>
            </div>
            
            <div id="display">
            {this.state.results.data&&this.state.results.data.map(el => {
                return(
                    <div id='card'>
                        <h2 id='name'>{el.name}</h2>
                        <h3 id='city'>City: {el.city}</h3>
                        <h4 id='directions'>Directions: {el.directions}</h4>
                        <p id='description'>{el.description}</p>
                        <img id='thumbnail' src={el.thumbnail} alt='thumbnail'/>
                        <CommentBox trailID={el.id}/>
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