import React, { Component } from 'react';
import {
    Map,
    // google,
    InfoWindow,
    Marker,
    GoogleApiWrapper,
} from 'google-maps-react';
require('dotenv').config();


class Trails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
    }
    componentDidMount() {
        // let map = new mapboxgl.Map({
        //     center: [-111.248932, 40.344304]
        // })
        // let service = new google.maps.places.PlacesService(map);

        // service.getDetails({
        //     placeId: 'ChIJAUKRDWz2wokRxngAavG2TD8'
        // }, (place, status) => {
        //     if (status === google.maps.places.PlacesServiceStatus.OK) {
        //         console.log(place.reviews);
        //     }
        // })
    }
  render() {
      const {places} = this.state;
    return (
      <div className="Trails">
        <p>{
            places.map((place) => {
                return <p>{place.author_name}{place.rating}{place.text}</p>
            })
        }</p>
        <Map google={this.props.google} zoom ={13} defaultCenter = {{lat: 40.2338, lng: 111.6585}}>
         
          <Marker onClick={this.onMarkerClick}
            name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
              
            </InfoWindow> 
        </Map>
        
      </div>
    );
  }
}



console.log(process.env.REACT_APP_API_KEY)
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(Trails);

