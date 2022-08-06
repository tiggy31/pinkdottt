import React,{useState,useEffect,createRef} from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './style.js';
import Places from '../Places/Places'

const List = ({rating,setRating,type,setType,cat,childClicked,isLoading}) => {

    const classes = useStyles();
    const [elRefs, setElrefs] = useState([])


   useEffect(() => {
      const refs = Array(cat?.businesses?.length).fill().map((_,i) => elRefs[i] || createRef())
                  setElrefs(refs)

   },[cat])


    return (
      <div className={classes.container}>
       {
        isLoading ? (
          <div classNmae={classes.loading}> 
              <CircularProgress size={"5rem"}/>
          </div>
        ): (
          <> 
            <FormControl className={classes.formControl}>
              <InputLabel id="type">Type</InputLabel>
              <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="Coffee">Coffee</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Gym">Gym</MenuItem>
                <MenuItem value="vintage">Thrift stores</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="rating">Rating</InputLabel>
              <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="3">Above 3.0</MenuItem>
                <MenuItem value="4">Above 4.0</MenuItem>
                <MenuItem value="4.5">Above 4.5</MenuItem>
              </Select>
            </FormControl>
           <Grid container spacing={3} className={classes.list}>
                {
                  cat?.businesses?.map((resource,i) => (
                    <Grid item key={i} xs={12}>
                      <Places resource={resource}
                              selected = {Number(childClicked)=== i}
                              refProp = {elRefs[i]}
                      />
                      </Grid>

                  ))
                }
           </Grid>
           </>
           )}
      </div>
    );
  };
  
export default List