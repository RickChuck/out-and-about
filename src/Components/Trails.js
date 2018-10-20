import React, { Component } from 'react';
import mountains from '../photos/mountains.png';
import axios from 'axios';
require('dotenv').config();

const{REACT_APP_API_KEY}=process.env

const trailStyle = {
    backgroundColor:'#FFE3D8'
}

const cardStyle = {
    margin: '40px',
    border: '5px solid black',

    
}
const headerStyle = {
    display: 'flex',
    width: '100%'
}

class Trails extends Component {
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
    console.log(this.state)
    return (
      <div className="Trails" style={trailStyle}>
         <img src={mountains} style={headerStyle} alt='mountains'></img>
        <div className="display">
        {this.state.results.data&&this.state.results.data.map(el => {
            return(
                <div className='card' style={cardStyle}>
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                    <div>
                        {/* <img alt='thumbnail'>{el.thumbnail}</img> */}
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



