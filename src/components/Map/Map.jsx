import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import mapStyles from './mapStyles'
// import mapStyles from '../../mapStyles';
import useStyles from './style.js';

const Map = ({setCoordinates,coordinates,bounds,setBounds,cat,setChildClicked}) => {
  const isMobile = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  // const coordinates = {
  //   lat: -34.397,
  //   lng: 150.644
  // }
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange= {(e) => {
               setCoordinates({
                lat: e.center.lat,
                lng: e.center.lng
               })

               setBounds({
                ne: e.marginBounds.ne,
                sw: e.marginBounds.sw
               })
        }}

        onChildClick={(child) =>{
          setChildClicked(child)
        }}
      >
      
           {
        cat?.businesses?.map((resource,i) => (
              <div
                 className={classes.markerContainer}
                 lat={Number(resource.coordinates.latitude)}
                 lng={Number(resource.coordinates.longitude)}
                 key={i}
              >

        {
          !isMobile ? (
            <LocationOnOutlinedIcon color= "primary" fontSize="large"/>
          ) : (
              <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {resource.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={resource.image_url ? resource.image_url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
                    alt={resource.name}
                  />
                  <Rating name="read-only" size="small" value={Number(resource.rating)} readOnly />
              </Paper>

          )
        }

              </div>

            ))
           }
        
      </GoogleMapReact>
    </div>
  );
};

export default Map;