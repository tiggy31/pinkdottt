import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getCatgories} from './api/index'


const App = () => {


  const [cat,setCat] = useState([])
  const [rating,setRating] = useState('')
  const [type,setType] = useState('')
  const [coordinates,setCoordinates] = useState({})
  const [bounds,setBounds] = useState(null)
  const [childClicked,setChildClicked] = useState('')
  const [isLoading,setLoading] = useState(false)
  const [filteredPlaces,setFilteredPlaces] = useState([])

useEffect(() => {
   navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
    setLoading(true)
        setCoordinates({
          lat: latitude,
          lng: longitude
        })
        setLoading(false)
   })
},[])



  useEffect(() => {
       const filteredPlaces = cat?.businesses?.filter((place) =>Number(place.rating) > rating)
            setLoading(true)
            setFilteredPlaces(filteredPlaces)
            setLoading(false)
          
  },[rating])

  

  useEffect(() => {
    setLoading(true)
    if(coordinates.lat && coordinates.lng){
    
      getCatgories(type,coordinates?.lat,coordinates?.lng)
       .then((data) => {
         setCat(data)
         setFilteredPlaces([])
         setLoading(false)
        
       })
    }
                   
  },[type,coordinates,rating])


  return (
    <>
      <CssBaseline />
      <Header  setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
              rating= {rating}
              type = {type}
              setRating = {setRating}
              setType = {setType}
              cat={filteredPlaces?.length ? filteredPlaces : cat}
              childClicked={childClicked}
              isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Map
          setCoordinates = {setCoordinates}
          coordinates = {coordinates}
          bounds= {bounds}
          setBounds = {setBounds}
          cat={filteredPlaces?.length ? filteredPlaces : cat}
          setChildClicked = {setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;

